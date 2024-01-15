import { axios } from "../../../lib/axios"

export const currentUser = () => {
   const response = axios.get("auth/me")
   console.log(response)

}
