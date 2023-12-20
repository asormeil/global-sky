import express from "express"
import cors from "cors"
import { countryRouter } from "./routers/country.router"
import { stateRouter } from "./routers/state.router"
import { globalErrorHandler } from "./errorHandler/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/countries", countryRouter)
app.use("/api/states", stateRouter)

app.use(globalErrorHandler)

export default app
