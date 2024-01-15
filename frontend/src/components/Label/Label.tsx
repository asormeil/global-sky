import React from "react"
import styled, { css } from "styled-components"

interface ILabelProps {
    type?: "title" | "subtitle" | "small"
    text: string
    htmlFor?: string
    className?: string
}

const styleMap = {
    title: css`
        font-size: 1.2rem;
        font-weight: 500;
    `,
    subtitle: css`
        font-size: 1rem;
        font-weight: 400;
    `,
    small: css`
        font-size: 0.8rem;
        font-weight: 200;
    `,
}

export const CustomLabel = styled.label<ILabelProps>`
    color: var(--primary-color);
    ${(props) => styleMap[props.type || "small"]};
`

export const Label: React.FC<ILabelProps> = ({
    type = "small",
    text,
    htmlFor,
    className,
}) => {
    return (
        <CustomLabel
            text={text}
            type={type}
            htmlFor={htmlFor}
            className={className}
        >
            {text}
        </CustomLabel>
    )
}
