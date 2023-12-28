import winston, { format } from "winston"
const { combine, timestamp, printf, colorize, errors } = format

const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`
})

// Create the logger with the custom format
export const logger = winston.createLogger({
    level: "info",
    format: combine(
        colorize(),
        timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        errors({ stack: true }),
        customFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({
            filename: "error.log",
            level: "error",
            format: format.combine(
                format.timestamp(),
                format.errors({ stack: true }),
                format.json()
            ),
        }),
        new winston.transports.Console({
            eol: "\n",
        }),
    ],
})
