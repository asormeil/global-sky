import { Request, Response, NextFunction } from "express"
import express from "express"
import { validationResult, query } from "express-validator"
import CustomError from "../utils/cusromError"
import * as countryService from "../services/country.service"
import { Country } from "../types"
import { toPascalCase } from "../utils/format"

export const countryRouter = express.Router()

// GET: all countries
countryRouter.get(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const countries: Country[] = await countryService.countryList()
            response.status(200).json({ data: countries })
        } catch (error: any) {
            next()
        }
    }
)

// GET: countries in a region
countryRouter.get(
    "/by-region",
    [query("region").exists().withMessage("Region is required!")],
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const errors = validationResult(request)
            if (!errors.isEmpty()) {
                new CustomError(
                    `Error in validating the request: ${JSON.stringify(
                        errors.array()
                    )}`,
                    400
                )
            }

            const region = request.query.region as string
            const countriesByRegion: Country[] =
                await countryService.countryListByRegion(toPascalCase(region))

            if (countriesByRegion.length === 0) {
                throw new CustomError(`No country was found in ${region}!`, 404)
            }

            response.status(200).json({ data: countriesByRegion })
        } catch (error: any) {
            next(error)
        }
    }
)
