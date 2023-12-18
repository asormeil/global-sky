import { Country } from "../types"
import { db } from "../utils/db.server"

export const countryList = async (): Promise<Country[]> => {
    return await db.country.findMany({
        select: {
            id: true,
            name: true,
            native: true,
            dialCode: true,
            longitude: true,
            latitude: true,
            flag: true,
            region: true,
            capital: true,
            iso2: true,
        },
    })
}

export const countryListByRegion = async (
    inputRegion: string
): Promise<Country[]> => {
    return await db.country.findMany({
        where: {
            region: inputRegion,
        },
        select: {
            id: true,
            name: true,
            native: true,
            dialCode: true,
            longitude: true,
            latitude: true,
            flag: true,
            region: true,
            capital: true,
            iso2: true,
        },
    })
}
