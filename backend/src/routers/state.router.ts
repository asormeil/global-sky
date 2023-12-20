import express, { NextFunction, Request, Response } from "express"
import { stateList, stateListByCountry } from "../services/state.service"
import { query, validationResult } from "express-validator"
import { State } from "../types"
import CustomError from "../errorHandler/customError"
import { toPascalCase } from "../utils/format"

export const stateRouter = express.Router()

stateRouter.get(
    "/",
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const states: State[] = await stateList()
            response.status(200).json({ data: states })
        } catch (error: any) {
            next(error)
        }
    }
)

stateRouter.get(
    "/by-country",
    [query("country").exists().withMessage("Country is required!")],
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const errors: any = validationResult(request)
            if (!errors.isEmpty()) {
                throw new CustomError(
                    `Error in validating the request: ${JSON.stringify(
                        errors.array()
                    )}`,
                    400
                )
            }
            const countryName: string = request.query.country as string
            const statesByCountry: State[] = await stateListByCountry(
                toPascalCase(countryName)
            )
            if (statesByCountry.length === 0) {
                throw new CustomError(
                    `No state was found in ${countryName}!`,
                    404
                )
            }
            response.status(200).json({ data: statesByCountry })
        } catch (error: any) {
            next(error)
        }
    }
)
