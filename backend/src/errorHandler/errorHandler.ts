import { Request, Response, NextFunction, ErrorRequestHandler } from "express"
import CustomError from "./customError"
import { logger } from "../configs/logger"
import { debug } from "../configs/debugger"

export const globalErrorHandler: ErrorRequestHandler = (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    
    logger.error(error.message, error)
    debug(error.message)

    if (error instanceof CustomError) {
        response.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        })
    } else {
        response.status(500).json({
            status: "error",
            message: "internal server error!",
        })
    }
}
