import CustomError from "../errorHandler/customError"
import { DetailedUser, User } from "../types"
import { db } from "../utils/db.server"
import jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const generateToken = (user: DetailedUser): string => {
    const token = jwt.sign(
        { _id: user.id, email: user.email },
        process.env.JWT_SECRET_KEY as string
    )
    return token
}

export const comparePassword = async (
    password: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
}

export const createUser = async (user: User): Promise<DetailedUser> => {
    const existingUser = await db.user.findUnique({
        where: {
            email: user.email,
        },
    })

    if (existingUser) {
        throw new CustomError(
            "user with this email already exist in the database!",
            400
        )
    }

    const createdUser = await db.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: await hashPassword(user.password),
        },
    })

    return createdUser
}

export const verifyUser = async (user: {
    email: string
    password: string
}): Promise<Boolean | undefined> => {
    const userRecord = await db.user.findUnique({
        where: { email: user.email, password: user.password },
        select: { email: true, name: true, createdAT: true, password: true },
    })

    if (!userRecord) {
        throw new CustomError(`user with ${user.email} not found`, 404)
    } else {
        const isValid: boolean = await comparePassword(
            user.password,
            userRecord.password
        )
        if (!isValid) {
            throw new CustomError(`email or password is not valid.`, 404)
        } else {
            return true
        }
    }
}

export const getUserByEmail = async (
    email: string
): Promise<DetailedUser | null>  => {
    return await db.user.findUnique({
        where: {
            email: email,
        },
    })

}
