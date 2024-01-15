import React from "react"
import styled from "styled-components"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
    validationMessage?: string
    label?: string
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em 0;
`

export const CustomInput = styled.input`
    font-size: 0.6em;
    padding: 0.25em 1em;
    margin-top: 0.5em;
`

export const ValidationMessage = styled.span`
    font-size: 0.8rem;
    color: red;
    margin-top: 0.5em;
`

export const Label = styled.label`
    font-size: 1rem;
    display: block;
`

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, validationMessage, ...props }, ref) => {
        return (
            <InputContainer>
                {label && <Label>{label}</Label>}
                <CustomInput ref={ref} {...props} />
                {validationMessage && (
                    <ValidationMessage>{validationMessage}</ValidationMessage>
                )}
            </InputContainer>
        )
    }
)

Input.displayName = "Input"
