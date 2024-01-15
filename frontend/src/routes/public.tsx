import { lazyImport } from "../utils/lazyImport"
import React from "react"

const { AuthRoutes } = lazyImport(
    () => import("../features/auth/routes"),
    "AuthRoutes"
)

export const publicRoutes = [
    {
        path: "/auth/*",
        element: <AuthRoutes />,
    },
]
