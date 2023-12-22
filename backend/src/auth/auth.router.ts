import express, { Request, Response, NextFunction } from "express"
import { validationResult, body } from "express-validator"
import CustomError from "../errorHandler/customError"
import { User } from "../types"
import { createUser, verifyUser, generateToken } from "./auth.service"

export const authRouter = express.Router()

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
            .withMessage("password is not valid"),
    ],
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
            const newUser: User = {
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
            }
            const registeredUser = await createUser(newUser)
            const token = generateToken(registeredUser)

            const {name, email, createdAT} = registeredUser

            response
                .header({ "x-auth-token": token })
                .status(200)
                .json({ message: "Successful register.", data: {name, email, createdAT} })
        } catch (error: any) {
            next(error)
        }
    }
)

authRouter.post(
    "/login",
    [
        body("email").exists().isEmail().withMessage("email is not valid."),
        body("password").exists().withMessage("password is required"),
    ],
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
                response.status(200).json({ message: "Successful login." })
            }
        } catch (error: any) {
            next(error)
        }
    }
)
