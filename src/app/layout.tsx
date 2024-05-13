import 'next-logger'
import '../global.css'

import React, { PropsWithChildren, ReactElement } from 'react'

import { verifyUserLoggedIn } from '../auth/withAuth'
import { InternalHeader } from "@navikt/ds-react";

export default async function RootLayout({ children }: PropsWithChildren): Promise<ReactElement> {
    await verifyUserLoggedIn()

    return (
        <html lang="en">
            <head>
                <title>Macgyver</title>
                <meta name="description" content="macgyver" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <main id="maincontent" role="main">
                    <InternalHeader>
                        <InternalHeader.Title href="/">Macgyver</InternalHeader.Title>
                    </InternalHeader>
                    {children}
                </main>
            </body>
        </html>
    )
}
