import express from "express"
import cors from "cors"
import Debug from "debug"
import { countryRouter } from "./routers/country.router"
import { stateRouter } from "./routers/state.router"
import { globalErrorHandler } from "./errorHandler/errorHandler"
import { authRouter } from "./auth/auth.router"

const app = express()
const debug = Debug("app:router")

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`)
    next()
})

app.use("/api/countries", countryRouter)
app.use("/api/states", stateRouter)
app.use("/api/auth", authRouter)

app.use(globalErrorHandler)

export default app
