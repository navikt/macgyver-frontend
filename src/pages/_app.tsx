import '@navikt/ds-css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { logger } from '@navikt/next-logger'

if (process.env.NODE_ENV !== 'production') {
    logger.info('Setting up MSW for local')
    require('../mocks')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <SWRConfig
            value={{
                revalidateOnReconnect: false,
                revalidateOnFocus: false,
                revalidateIfStale: false,
            }}
        >
            <Component {...pageProps} />
        </SWRConfig>
    )
}

export default MyApp
