import React from "react"
import { Header } from "../Header/Header"
import { MainProvider } from "../../providers"
import { AppRoutes } from "../../routes"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    min-height: 100vh;
    background-color: var(--background-color);
    position: relative;
`

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Container>
                <MainProvider>
                    <AppRoutes />
                </MainProvider>
            </Container>
        </>
    )
}
