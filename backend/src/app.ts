import * as dotenv from "dotenv"
import express, { Request, Response, NextFunction } from "express"
import cors from "cors"
import { countryRouter } from "./routers/country.router"
import { stateRouter } from "./routers/state.router"
import CustomError from "./utils/cusromError"

dotenv.config()

/** unexpected results handling */
if (!process.env.PORT) {
    console.log(`PORT not found to set up, shutting down ...`)
    process.exit(1)
}
process.on("uncaughtException", (error) => {
    console.log(`Unexpected error: ${error}, shutting down ...`),
        process.exit(1)
})

process.on("unhandledRejection", (error) => {
    console.log(`Unexpected rejection: ${error}, shutting down ...`)
    process.exit(1)
})

const PORT: number = parseInt(process.env.PORT as string, 10)

/** server set up */
const app = express()
app.use(cors())
app.use(express.json())

/** routers handling */
app.use("/api/countries", countryRouter)
app.use("/api/states", stateRouter)

/** global error handling */
app.use(
    (
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
                status: 500,
                message: "Internal server error!",
            })
        }
    }
)

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})
