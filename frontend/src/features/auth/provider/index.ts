import { createContext } from "react"
import { User } from "../type"



export interface IAuthContext {
    user: User
    register: () => void
    login: () => void
    logout: () => void
}

export const authContextValue: IAuthContext = {
    user: {
        name: "",
        family: "",
        email: "",
        password: "",
    },
    login: () => {},
    logout: () => {},
    register: () => {},
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)


