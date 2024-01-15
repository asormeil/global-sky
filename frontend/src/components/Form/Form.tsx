import React, { FormHTMLAttributes, ReactNode } from "react"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export type FormProps = {
    children: ReactNode
    schema: z.ZodType<any, any>
    defaultValues?: Record<string, any>
} & FormHTMLAttributes<HTMLFormElement>

export const Form: React.FC<FormProps> = ({
    children,
    schema,
    defaultValues,
    ...rest
}) => {
    // Initialize react-hook-form methods
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    })

    return (
        <FormProvider {...methods}>
            <form {...rest}>{children}</form>
        </FormProvider>
    )
}
