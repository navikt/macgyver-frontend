import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { useEffect } from 'react';
import { Modal } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger'

if (process.env.NODE_ENV !== 'production') {
    logger.info('Setting up MSW for local')
    require('../mocks')
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useEffect(() => {
        Modal.setAppElement?.('#__next');
    }, []);

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
    );
}

export default MyApp;
