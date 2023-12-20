import { State } from "../types"
import { db } from "../utils/db.server"

export async function stateList(): Promise<any> {
    return await db.state.findMany({
        select: {
            id: true,
            name: true,
            code: true,
            latitude: true,
            longitude: true,
            countryId: true,
            country: {
                select: {
                    name: true,
                    iso2: true,
                    native: true,
                },
            },
        },
    })
}

export async function stateListByCountry(
    inputCountryName: string
): Promise<State[] | null> {
    const states = await db.state.findMany({
        where: {
            country: { name: inputCountryName },
        },
        select: {
            id: true,
            name: true,
            code: true,
            latitude: true,
            longitude: true,
            country: {
                select: { name: true },
            },
        },
    })
    return states
}

export const getStateById = async (stateId: number): Promise<State | null> => {
    const state = await db.state.findUnique({
        where: { id: stateId },
        select: {
            id: true,
            name: true,
            code: true,
            latitude: true,
            longitude: true,
            country: {
                select: { name: true, iso2: true, native: true },
            },
        },
    })

    return state
}
