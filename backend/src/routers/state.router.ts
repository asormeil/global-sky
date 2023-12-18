import express, { Request, Response } from "express"
import { stateList, stateListByCountry } from "../services/state.service"
import { body, validationResult } from "express-validator"
import { State } from "../types"

export const stateRouter = express.Router()

stateRouter.get("/", async (request: Request, response: Response) => {
    try {
        const states: State[] = await stateList()
        response.status(200).json(states)
    } catch (error: any) {
        response.status(500).json(`Error in getting states: ${error.message}`)
    }
})

stateRouter.get("/:country", async (request: Request, response: Response) => {
    try {
        const inputCountryName:  string = request.params.country
        const statesByCountry = await stateListByCountry(inputCountryName)
    } catch (error) {}
})
