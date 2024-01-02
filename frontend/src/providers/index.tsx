import { BrowserRouter as Router } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { HelmetProvider } from "react-helmet-async"
import React from "react"
import { Spinner } from "../components/Spinner"
import { queryClient } from "../lib/query"
import { AuthContext, authContextValue } from "../features/auth/provider"

const ErrorFallback = () => {
    return (
        <div>
            <h2>Oops something went wrong :(</h2>
        </div>
    )
}

type MainProviderProps = {
    children: React.ReactNode
}



export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
    return (
        <React.Suspense fallback={<Spinner text="Loading..." size={150} />}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        <AuthContext.Provider value={authContextValue}>
                        <Router>{children}</Router>
                        </AuthContext.Provider>
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    )
}
