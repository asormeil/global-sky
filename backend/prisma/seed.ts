const fs = require("fs").promises
const path = require("path")
import { User, Country, State, Role } from "../src/types"
import { db } from "../src/utils/db.server"

const ADMIN: User = {
    name: "admin",
    email: String(process.env.ADMIN_EMAIL),
    password: String(process.env.ADMIN_PASSWORD),
    role: Role.ADMIN,
}

async function readFiles(): Promise<[Array<Country>, Array<State>]> {
    const filePath = path.join(__dirname, "./countries.json")
    try {
        const data = await fs.readFile(filePath, "utf8")
        return getCountriesStates(Array.from(JSON.parse(data)))
    } catch (error) {
        console.log("Error in reading file.", error)
        throw error
    }
}

function getCountriesStates(data: Array<any>): [Array<Country>, Array<State>] {
    let states: Array<State> = []
    let countries: Array<Country> = []

    data.forEach((country: any) => {
        countries.push({
            id: -1,
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
                id: -1,
                name: state.name,
                code: state.state_code,
                latitude: state.latitude,
                longitude: state.longitude,
                country: country,
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
            await db.state.deleteMany()
            await db.country.deleteMany()

            console.log(
                "db tables were aleady seeded, removed the existing rows."
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
            (map: any, country: any) => {
                map[country.name] = country.id
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
                        countryId: countryMapper[state.country["name"]],
                    },
                })
            })
        )
        const users = await db.user.create({
            data: {
                name: ADMIN.name,
                email: ADMIN.email,
                role: ADMIN.role,
                password: ADMIN.password,
            },
        })

        console.log(
            `Successfully seeded, inserted countries: ${insertedCountries.length}, inserted states: ${insertedStates.length}, inserted admin: ${ADMIN.email}`
        )
    } catch (error) {
        console.error("Error in seed function: ", error)
        throw error
    }
}

seed()
