import { Helmet } from "react-helmet-async"
import React from "react"

type HeadProps = {
    description?: string
    title?: string
    favicon?: string
}

export const Head = ({ description, title }: HeadProps) => {
    return (
        <Helmet
            title={title ? `${title} | Global Sky` : undefined}
            defaultTitle="Global Sky"
        >
            <meta name="description" content={description} />
        </Helmet>
    )
}
