import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import CustomError from "../errorHandler/customError"

export const auth = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.header("x-auth-token")
    if (!token) {
        // pass the exception to the error handler
        throw new CustomError("access denied, no token provided.", 401)
    }

    try {
        const decodedPayload = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        )
        // { _id: user.id, email: user.email}
        request.body.user = decodedPayload

        //pass to the next middleware in response processing chain
        next()
    } catch (error) {
        // terminate the request processing chain
        new CustomError("invalid token. error in decoding the token", 400)
    }
}
