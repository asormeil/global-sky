class CustomError extends Error {
    public statusCode: number
    public isOperational: boolean
    public status: string

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        this.status = statusCode >= 400 && statusCode < 500 ? "failed" : "error"
        Error.captureStackTrace(this, this.constructor)
    }
}

export default CustomError
