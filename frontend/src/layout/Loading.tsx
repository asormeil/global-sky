import {z} from "zod"
import React from "react"

const schema = z.object({
    message: z.string()
})
type LoadingProps = z.infer<typeof schema>

export const Loading: React.FC<LoadingProps> = ({message})=> {

return (
    <>
    <h1>Loading ... {message}</h1>
    </>
)
}