import { useNavigate } from "react-router"
import { Button } from "../../components/Button"
import { Head } from "../../components/Head"
import React from "react"
import moonImage from "../../assets/images/moon.png"
import "./Landing.scss"

export const Landing: React.FC = () => {
    const navigate = useNavigate()
    const handleStart = () => {
        // condition for checking the auth.login
        navigate("auth/register")
    }

    return (
        <>
            <Head description="Welcome to Global Sky" title="Welcome" />

            <p className="title"> Welcome to Global Sky App</p>
            <img src={moonImage} className="image" alt="Moon Image" />

            <Button
                id="register-button"
                label="Start"
                theme="primary"
                onClick={handleStart}
                className="button"
            ></Button>
        </>
    )
}
