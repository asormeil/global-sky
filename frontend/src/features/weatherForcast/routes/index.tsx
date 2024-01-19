import { Routes, Route } from "react-router-dom"
import React from "react"

import { WeatherForm } from "../components/WeatherForm";


export const WeatherRoutes: React.FC = () => {
    return(
        <Routes>
            <Route path="weather" element={<WeatherForm />} />
        </Routes>
        );
    
}
