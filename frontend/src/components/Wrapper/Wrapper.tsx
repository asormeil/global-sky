import React, { ReactNode } from "react"
import styled from "styled-components"

type WrapperProps = {
    children: ReactNode
    className?: string
}

export const CustomWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 1em;
    max-width: 60vw;
    min-width: 60vw;
    margin: 0.5em auto;
    width: 100%;
`

export const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
    return <CustomWrapper className={className}>{children}</CustomWrapper>
}

export const ChildContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.2rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }

    & > div {
        flex: 1;

        &:not(:last-child) {
            margin-right: 10px;
        }
    }
`

export const Row: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <ChildContainer>{children}</ChildContainer>
}
