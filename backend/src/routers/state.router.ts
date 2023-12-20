import express, { NextFunction, Request, Response } from "express"
import { getStateById, stateListByCountry } from "../services/state.service"
import { query, validationResult, param } from "express-validator"
import { State } from "../types"
import CustomError from "../errorHandler/customError"
import { toPascalCase } from "../utils/format"

export const stateRouter = express.Router()

stateRouter.get(
    "/:id",
    [param("id").exists().isNumeric()],
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
            const stateId: number = parseInt(request.params.id)
            const state: State | null = await getStateById(stateId)
            if (!state) {
                throw new CustomError(
                    `The state by ${stateId} was not found!`,
                    404
                )
            } else {
                response.status(200).json({ data: state })
            }
        } catch (error: any) {
            next(error)
        }
    }
)

stateRouter.get(
    "/by-country",
    [
        query("country")
            .exists()
            .isLength({ min: 2 })
            .withMessage("Country is required!"),
    ],
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
            const statesByCountry: State[] | null = await stateListByCountry(
                toPascalCase(countryName)
            )
            if (!statesByCountry || statesByCountry.length === 0) {
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
