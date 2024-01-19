import { AxiosError } from "axios"
import { axios } from "../../../lib/axios"
import { User } from "../type"

export type ResType = {
    error: string
    data: Array<any>
}
export const register = async (userData: User) => {
    const registerResponse: ResType = {
        error: "",
        data: [],
    }
    const registerData = {
        name: userData.firstName + " " + userData.lastName,
        email: userData.email,
        password: userData.password,
    }
    const response = await axios.post("auth/register", registerData)
    try {
        if (response instanceof AxiosError) {
            registerResponse.error = response.response?.data.message
        } else {
            registerResponse.data = response.data
            // change the status of user to logged in
        }
        return registerResponse
    } catch (error) {
        return Promise.reject(error)
    }
}
