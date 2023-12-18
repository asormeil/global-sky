import { Request, Response } from "express"
import express from "express"
import { body, validationResult } from "express-validator"

import * as countryService from "../services/country.service"
import { Country } from "../types"

export const countryRouter = express.Router()

// GET: all countries
countryRouter.get("/", async (request: Request, response: Response) => {
    try {
        const countries: Country[] = await countryService.countryList()
        response.status(200).json(countries)
    } catch (error: any) {
        response.status(500).json(error.message)
    }
})

// GET: countries in a region
countryRouter.get("/:region", async (request: Request, response: Response) => {
    const errors: any = validationResult(request)
    if (!errors.isEmpty()) {
        response.status(500).json(errors.array())
    }
    try {
        const region: string = request.params.region as string
        console.log(region)
        const countriesByRegion: Country[] = await countryService.countryListByRegion(
            region
        )
        countriesByRegion.length > 0
            ? response.status(200).json(countriesByRegion)
            : response.status(404).json("No country found in the region.")
    } catch (error: any) {
        response.status(500).json(error.message)
    }
})
