import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"

import { Form } from "../../../../components/Form"
import { Input } from "../../../../components/Input"
import { Button } from "../../../../components/Button"
import { Label } from "../../../../components/Label"
import { Wrapper, Row } from "../../../../components/Wrapper/Wrapper"
import { validationSchema, User } from "../../type"
import { ResType, register } from "../../api/register"

export const RegisterForm = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<User>({
        resolver: zodResolver(validationSchema),
        mode: "onChange",
    })

    const navigate = useNavigate()

    const onFormSubmit = async (data: any) => {
        const registerRespone: ResType | any = await register(data)

        if (registerRespone.error) {
            toast.error(registerRespone.error.toString(), {
                position: "bottom-center",
            })
        } else {
            toast.info("Welcome to Global Sky", {
                position: "top-left",
            })
            navigate("/weather")
        }
    }

    return (
        <Form
            schema={validationSchema}
            id="register-form"
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <Wrapper>
                <Label text="Register Account" type="title" />
                <ToastContainer />
                <Row>
                    <Controller
                        control={control}
                        name="firstName"
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    label="First Name"
                                    validationMessage={
                                        errors.firstName &&
                                        errors.firstName.message
                                    }
                                    {...field}
                                ></Input>
                            </>
                        )}
                    />

                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    label="Last Name"
                                    validationMessage={
                                        errors.lastName &&
                                        errors.lastName.message
                                    }
                                    {...field}
                                ></Input>
                            </>
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="password"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    label="Password"
                                    validationMessage={
                                        errors.password &&
                                        errors.password.message
                                    }
                                    {...field}
                                ></Input>
                            </>
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    label="Confirm Password"
                                    validationMessage={
                                        errors.confirmPassword &&
                                        errors.confirmPassword.message
                                    }
                                    {...field}
                                ></Input>
                            </>
                        )}
                    />
                </Row>
                <Row>
                    <Controller
                        name="email"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                            <>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    label="Email"
                                    validationMessage={
                                        errors.email && errors.email.message
                                    }
                                    {...field}
                                ></Input>
                            </>
                        )}
                    />
                </Row>
                <Button
                    id="submit"
                    label="Register"
                    theme="primary"
                    type="submit"
                ></Button>
            </Wrapper>
        </Form>
    )
}
