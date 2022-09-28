import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { useEffect } from 'react';
import { Modal } from '@navikt/ds-react';

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
