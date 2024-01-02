import { z } from "zod"
import React from "react"

const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type RegisterFormProps = z.infer<typeof schema>

export const RegisterForm: React.FC<RegisterFormProps> = () => {
    return (
        <div className="loading">
            <p>Loading... </p>
        </div>
    )
}
