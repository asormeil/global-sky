import React from "react"
import "./MainLayout.scss"
import { Header } from "../Header/Header"

export const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <div className="main">Hello React</div>
            <div className="footer">We are footer</div>
        </>
    )
}
