import * as dotenv from "dotenv"
import { logger } from "./logger"
dotenv.config()


if (!process.env.PORT) {
    logger.error(`PORT not found to set up, shutting down ...`)
    process.exit(1)
}

if (!process.env.ADMIN_EMAIL) {
    logger.error(`admin email not found to set up, shutting down ...`)
    process.exit(1)
}

if (!process.env.ADMIN_PASSWORD) {
    logger.error(`admin password not found to set up, shutting down ...`)
    process.exit(1)
}

if (!process.env.JWT_SECRET_KEY) {
    logger.error(`jwt secret code not found to set up, shutting down ...`)
    process.exit(1)
}

process.on("uncaughtException", (error: Error) => {
    logger.error(`Unexpected error: ${error}, shutting down ...`, error)
    process.exit(1)
})

process.on("unhandledRejection", (error: Error) => {
    logger.error(`Unexpected rejection: ${error}, shutting down ...`, error)
    process.exit(1)
})

export const PORT: number = parseInt(process.env.PORT as string, 10)
