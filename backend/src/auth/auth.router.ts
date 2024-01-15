import express, { Request, Response, NextFunction } from "express"
import { validationResult, body } from "express-validator"
import CustomError from "../errorHandler/customError"
import { DetailedUser, User } from "../types"
import {
    createUser,
    verifyUser,
    generateToken,
    getUserByEmail,
} from "./auth.service"
// authorization middleware
import { auth } from "../middlewares/auth.middleware"
export const authRouter = express.Router()

// private endpoint, getting current user and returning it based on jwt
authRouter.get(
    "/me",
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const email = request.body.user.email
            const user: DetailedUser | null = await getUserByEmail(email)
            if (user) {
                response.status(200).json({
                    message: "current user",
                    data: { email: user.email },
                })
            }
        } catch (error: any) {
            next(error)
        }
    }
)
// public endpoint
authRouter.post(
    "/register",
    [
        body("name")
            .exists()
            .isLength({ min: 3 })
            .withMessage("name is required, min length 3."),
        body("email").exists().isEmail().withMessage("email is invalid"),
        body("password")
            .exists()
            .isStrongPassword({ minSymbols: 0 })
            .withMessage("password is not valid."),
    ],
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                response.status(400).json({
                    message: `Error in validating the request: ${JSON.stringify(
                        errors.array()
                    )}`,
                })
            }
            const newUser: User = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
            }
            const registeredUser = await createUser(newUser)
            if (registeredUser instanceof CustomError) {
                response.status(registeredUser.statusCode).json({
                    message: registeredUser.message,
                })
            } else {
                const token = generateToken(registeredUser)

                const { name, email, createdAT } = registeredUser

                response.header({ "x-auth-token": token }).status(200).json({
                    message: "successful register.",
                    data: { name, email, createdAT },
                })
            }
        } catch (error: any) {
            next(error)
        }
    }
)

// private endpoint
authRouter.post(
    "/login",
    [
        body("email").exists().isEmail().withMessage("email is not valid."),
        body("password").exists().withMessage("password is required"),
    ],
    auth,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                throw new CustomError(
                    `Error in validating the request: ${JSON.stringify(
                        errors.array()
                    )}`,
                    400
                )
            }

            const user = {
                email: request.body.email as string,
                password: request.body.password,
            }

            const result = await verifyUser(user)

            if (result) {
                response.status(200).json({ message: "successful login." })
            }
        } catch (error: any) {
            next(error)
        }
    }
)
