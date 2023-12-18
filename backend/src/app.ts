import * as dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { countryRouter } from "./routers/country.router"
import { stateRouter } from "./routers/state.router"

dotenv.config()

if (!process.env.PORT) {
    process.exit(-1)
}

const PORT: number = parseInt(process.env.PORT as string, 10)

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/countries", countryRouter)
app.use("/api/states", stateRouter)
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})
