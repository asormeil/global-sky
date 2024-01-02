import React from "react"
import Link from "react-router-dom"
import "./Header.scss"

export const Header: React.FC = () => {
    return (
        <div className="container">
            <ul className="list">
                <li>Home</li>
                <li>Setting</li>
                <li>Log out</li>
            </ul>
        </div>
    )
}
