import { createContext } from "react"
import { User } from "../type"
import { register } from "../../auth/api/register"



export interface IAuthContext {
    user: User
    register: () => void
    // login: () => void
    // logout: () => void
}

export const authContextValue: IAuthContext = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    },
    // login: () => {},
    // logout: () => {},
    register: () => {register},
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)


