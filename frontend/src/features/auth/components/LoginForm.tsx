import React, { FormEvent } from "react"
import { Form } from "../../../components/Form"
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const LoginForm = () => {
    const methods = useForm({
        resolver: zodResolver(schema),
    })
    const handleregisterSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(e)
    }

    const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e)
    }
    return (
        <Form onSubmit={handleregisterSubmit} schema={schema}>
            <Input
                type="email"
                id="register-emil-input"
                placeholder="Email"
            ></Input>
            <Input
                type="password"
                id="register-emil-input"
                placeholder="Password"
            ></Input>
            <Button
                label="Register"
                theme="primary"
                onClick={handleRegisterClick}
            ></Button>
        </Form>
    )
}
