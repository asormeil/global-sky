import express from "express"
import cors from "cors"
import { countryRouter } from "./routers/country.router"
import { stateRouter } from "./routers/state.router"
import { globalErrorHandler } from "./errorHandler/errorHandler"
import { authRouter } from "./auth/auth.router"
import { debug } from "./configs/debugger"

const app = express()

app.use(cors())

// here we are applying middleware functions
app.use(express.json())

app.use((req, res, next) => {
    debug(`Incoming request: ${req.method} ${req.path}`)
    next()
})


app.use("/api/countries", countryRouter)
app.use("/api/states", stateRouter)
app.use("/api/auth", authRouter)

app.use(globalErrorHandler)

export default app
