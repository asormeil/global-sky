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
        if (response.status != 200) {
            registerResponse.error = response.data.message
        } else {
            registerResponse.data = response.data
        }
        return registerResponse
    } catch (error) {
        console.log(error)

        return Promise.reject(error)
    }
}
