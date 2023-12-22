export interface BasicCountry {
    id?: number
    name: string
    iso2: string
}
export interface Country extends BasicCountry {
    dialCode: string
    flag: string
    region: string
    native: string
    capital: string
    latitude: string
    longitude: string
}

export type State = {
    id?: number
    name: string
    code: string
    latitude: string
    longitude: string
    country: Country | BasicCountry
}

export interface User {
    name: string
    email: string
    password: string
}
export interface DetailedUser extends User {
    id: number
    createdAT: Date
    role: string
}


