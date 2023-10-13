import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { grantAzureOboToken, isInvalidTokenSet, validateAzureToken } from '@navikt/next-auth-wonderwall'
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

    const bearerToken: string | null | undefined = requestHeaders.get('authorization')
    if (!bearerToken) {
        logger.info('No token found, redirecting to login')
        redirect(`/oauth2/login?redirect=${redirectPath}`)
    }

    const validationResult = await validateAzureToken(bearerToken)
    if (validationResult !== 'valid') {
        if (validationResult.errorType !== 'EXPIRED') {
            logger.error(
                new Error(
                    `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
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
    const requestHeaders = headers()
    const bearerToken: string | null | undefined = requestHeaders.get('authorization')?.replace('Bearer ', '')
    if (!bearerToken) {
        logger.info('No token found, redirecting to login')
        throw new Error('Missing token')
    }

    const oboToken = await grantAzureOboToken(bearerToken, process.env.MACGYVER_BACKEND_SCOPE ?? 'scope not set')

    if (isInvalidTokenSet(oboToken)) {
        logger.error(oboToken.message)
        throw new Error('Invalid token')
    }

    return fetch(`http://macgyver/api/${path}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${oboToken}`,
            ...fetchHeaders,
        },
        body: body ?? null,
    })
}
