import styled from "styled-components"
import React, { ButtonHTMLAttributes } from "react"

export type ButtonProps = {
    label: string
    theme: "primary" | "secondary"
} & ButtonHTMLAttributes<HTMLButtonElement>

const CustomButton = styled.button<{ theme: "primary" | "secondary" }>`
    background: ${(props) =>
        props.theme === "primary"
            ? "var(--primary-color)"
            : "var(--light-text-color)"};
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid var(--primary-color);
    border-radius: 3px;
    color: ${(props) =>
        props.theme === "primary"
            ? "var(--light-text-color)"
            : "var(--primary-color)"};
    &:hover {
        background: ${(props) =>
            props.theme === "primary"
                ? "var(--light-text-color)"
                : "var(--primary-color)"};
        color: ${(props) =>
            props.theme === "primary"
                ? "var(--primary-color)"
                : "var(--light-text-color)"};
    }
`

export const Button = ({ label, theme, ...rest }: ButtonProps) => {
    
    return (
        <CustomButton theme={theme} {...rest}>
            {label}
        </CustomButton>
    )
}
