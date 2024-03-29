import { useRoutes } from "react-router-dom"
import React, { useContext } from "react"
import { Landing } from "../layout/Landing/Landing"
import { publicRoutes } from "./public"
import { AuthContext } from "../features/auth/provider"

export const AppRoutes = () => {
    const authContext = useContext(AuthContext)
    authContext?.user
    // if user is logged in use protected otherwise public
    //const routes  = auth.user ? protectedRoutes : publicRoutes
    // create an element of routes to return
    // const element = useRoutes([...Routes, ])
    const commonRoutes = [
        {
            path: "/",
            element: <Landing />,
        },
    ]
    
    const route = useRoutes([...commonRoutes, ...publicRoutes])
    return <>{route}</>
}
