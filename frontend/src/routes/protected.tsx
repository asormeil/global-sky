import { lazyImport } from "../utils/lazyImport"
import React from "react"

const { WeatherRoutes } = lazyImport(
    () => import("../features/weatherForcast/routes"),
    "WeatherRoutes"
)

export const publicRoutes = [
    {
        path: "/weather/*",
        element: <WeatherRoutes />,
    },
]
