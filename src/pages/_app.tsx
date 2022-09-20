import "@navikt/ds-css-internal";
import type { AppProps } from 'next/app'
import {logger} from "../utils/logger";

function MyApp({ Component, pageProps }: AppProps) {
  logger.info('Hello from logger');
  return <Component {...pageProps} />
}

export default MyApp
