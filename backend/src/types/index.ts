export type Country = {
    id: number
    name: string
    iso2: string
    dialCode: string
    flag: string
    region: string
    native: string
    capital: string
    latitude: string
    longitude: string
}

export type State = {
    id: number
    name: string
    code: string
    latitude: string
    longitude: string
    countryName: string
    countryId?: number
}


