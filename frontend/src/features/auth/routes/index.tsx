import { Routes, Route } from "react-router-dom"
import React from "react"
import { RegisterForm } from "../components/Register/RegisterForm"
import { LoginForm } from "../components/LoginForm"

export const AuthRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="register" element={<RegisterForm />} />
            <Route path="login" element={<LoginForm />} />
        </Routes>
    )
}
