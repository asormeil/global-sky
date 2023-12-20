import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import CustomError from "./customError"

export const globalErrorHandler: ErrorRequestHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (error instanceof CustomError) {
        response.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        })
    } else {
        response.status(500).json({
            status: "error",
            message: "Internal server error!",
        })
    }
}
