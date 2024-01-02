import { z } from "zod"

const userSchema = z.object({
    name: z.string(),
    family: z.string(),
    email: z.string().email({ message: "Invalid email!" }),
    password: z.string(),
})

export type User = z.infer<typeof userSchema>
