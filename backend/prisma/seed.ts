const fs = require('fs').promises
const path = require('path')

import { Country, State } from '../src/types'
import { db } from '../src/utils/db.server'

async function readFiles(): Promise<[Array<Country>, Array<State>]> {
    const filePath = path.join(__dirname, './countries.json')
    try {
        const data = await fs.readFile(filePath, 'utf8')
        return getCountriesStates(Array.from(JSON.parse(data)))
    } catch (error) {
        console.log('Error in reading file.', error)
        throw error
    }
}

function getCountriesStates(data: Array<any>): [Array<Country>, Array<State>] {
    let states: Array<State> = []
    let countries: Array<Country> = []

    data.forEach((country: any) => {
        countries.push({
            ID: -1,
            name: country.name,
            iso2: country.iso2,
            dialCode: country.phone_code,
            flag: country.emoji,
            region: country.region,
            native: country.native,
            capital: country.capital,
            latitude: country.latitude,
            longitude: country.longitude,
        })
        country.states.forEach((state: any) => {
            states.push({
                ID: -1,
                name: state.name,
                code: state.state_code,
                latitude: state.latitude,
                longitude: state.longitude,
                countryName: country.name,
            })
        })
    })

    return [countries, states]
}
async function seed() {
    try {
        const [countries, states] = await readFiles()

        const countyCount = await db.country.count()
        const stateCount = await db.state.count()

        if (countyCount !== 0 || stateCount !== 0) {
            await db.country.deleteMany()
            await db.state.deleteMany()
            console.log(
                'db tables were aleady seeded, removed the existing rows.'
            )
        }

        const insertedCountries: Array<Country> = await Promise.all(
            countries.map((country) => {
                return db.country.create({
                    data: {
                        name: String(country.name),
                        iso2: String(country.iso2),
                        flag: String(country.flag),
                        latitude: String(country.latitude),
                        longitude: String(country.longitude),
                        native: String(country.native),
                        capital: String(country.capital),
                        dialCode: String(country.dialCode),
                        region: String(country.region),
                    },
                })
            })
        )

        const countryMapper = insertedCountries.reduce(
            (map: { [key: string]: number }, country: Country) => {
                map[country.name] = country.ID
                return map
            },
            {}
        )

        const insertedStates = await Promise.all(
            states.map((state) => {
               return db.state.create({
                    data: {
                        name: String(state.name),
                        code: String(state.code),
                        latitude: String(state.latitude),
                        longitude: String(state.longitude),
                        countryID: countryMapper[state.countryName],
                    },
                })
            })
        )

        console.log(insertedStates)

        console.log(
            `Successfully seeded, inserted states: ${insertedCountries.length}, inserted states: ${insertedStates.length}`
        )
    } catch (error) {
        console.error('Error in seed function: ', error)
        throw error
    }
}

seed()
