import HashLoader from "react-spinners/HashLoader"
import React, { CSSProperties } from "react"
import styled from "styled-components"

const Container = styled.div`
    flex: display;
    justify-content: center;
`
type SpinnerProps = {
    text: string
    size: number
    override?: CSSProperties
}
export const Spinner: React.FC<SpinnerProps> = ({
    text = "Loading ... ",
    size = 150,
    override = {},
}) => {
    return (
        <Container>
            <label>{text}</label>
            <HashLoader
                color="white"
                loading={true}
                cssOverride={override}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </Container>
    )
}
