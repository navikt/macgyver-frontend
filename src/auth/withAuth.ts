import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { validateToken, requestOboToken, getToken } from '@navikt/oasis'
import { redirect } from 'next/navigation'

export async function verifyUserLoggedIn(): Promise<void> {
    logger.info('Getting headers')
    const requestHeaders = headers()

    if (process.env.NODE_ENV !== 'production') {
        logger.warn('Is running locally, skipping authentication for page')
        return
    }

    const redirectPath = requestHeaders.get('x-path')
    if (!redirectPath == null) {
        logger.warn("Missing 'x-path' header, is middleware middlewaring?")
    }
    logger.info(`Redirect path is ${redirectPath}`)

    const token = getToken(requestHeaders)
    if (!token) {
        logger.info('No token found, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateToken(token)
    if (!validationResult.ok) {
        if (validationResult.errorType !== 'token expired') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.error.message}, redirecting to login.`,
                    { cause: validationResult.error },
                ),
            )
        }
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }
}

export async function authorizationFetch(
    path: string,
    method: string = 'GET',
    fetchHeaders: HeadersInit = {},
    body?: BodyInit,
): Promise<Response> {
    const bearerToken = getToken(headers())
    if (!bearerToken) {
        logger.info('No token found, redirecting to login')
        throw new Error('Missing token')
    }

    const oboResult = await requestOboToken(bearerToken, process.env.MACGYVER_BACKEND_SCOPE ?? 'scope not set')
    if (!oboResult.ok) {
        logger.error(oboResult.error)
        throw new Error('Invalid token')
    }

    console.info(`Fetching: ${method} http://macgyver/api/${path}`)
    return fetch(`http://macgyver/api/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oboResult.token}`,
            ...fetchHeaders,
        },
        body: body ?? null,
    })
}
