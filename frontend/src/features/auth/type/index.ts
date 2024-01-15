import { z } from "zod"

export const validationSchema = z
    .object({
        firstName: z.string().min(1, { message: "Firstname is required" }),
        lastName: z.string().min(1, { message: "Lastname is required" }),
        email: z.string().min(1, { message: "Email is required" }).email({
            message: "Must be a valid email",
        }),
        password: z
            .string()
            .min(6, { message: "Password must be atleast 6 characters" })
            .regex(/[A-Z]/, {
                message: "Password must include an uppercase letter",
            })
            .regex(/[a-z]/, {
                message: "Password must include a lowercase letter",
            })
            .regex(/[0-9]/, { message: "Password must include a digit" }),
        confirmPassword: z
            .string()
            .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password don't match",
    })

export type User = z.infer<typeof validationSchema>
