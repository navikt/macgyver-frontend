import { SetupWorker, StartOptions } from 'msw'
import { SetupServer } from 'msw/node'

const whitelistRequests: string[] = ['/', '/_next/', '/api/logger', '/aksel/fonts']

const onUnhandledRequest: StartOptions['onUnhandledRequest'] = (req, print): void => {
    if (whitelistRequests.some((whitelisted: string) => req.url.pathname.startsWith(whitelisted))) {
        return
    }
    print.warning()
}

async function initMocks(): Promise<void> {
    if (typeof window === 'undefined') {
        const { server }: { server: SetupServer } = await import('./server')
        server.listen()
    } else {
        const { worker }: { worker: SetupWorker } = await import('./browser')
        worker.start({
            onUnhandledRequest,
        })
    }
}

initMocks()

export {}
