import Axios, { InternalAxiosRequestConfig } from "axios"
import { AppStorage } from "../utils/storage"
import { API_BASE_URL } from "../config"

const storage = new AppStorage()

// the lib attaches the token header to request and makes data from response
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
    const token = storage.getToken()
    if (token) {
        config.headers.authorization = `${token}`
    }
    return config
}

export const axios = Axios.create({
    baseURL: API_BASE_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
    (response) => {
        if (response.headers["x-auth-token"]) {
            storage.setToken(response.headers["x-auth-token"] as string)
        }
        return response
    },
    (error) => {
        console.log(error)
        return error
    }
)
