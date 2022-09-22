import { GetServerSidePropsContext, GetServerSidePropsResult, NextApiRequest, NextApiResponse } from 'next';
import { AzureAdErrorVariants, validateAzureToken, ValidationResult } from '@navikt/next-auth-wonderwall';
import { logger } from '@navikt/next-logger';

type PageHandler = (
    context: GetServerSidePropsContext,
    accessToken: string,
) => Promise<GetServerSidePropsResult<unknown>>;

type ApiHandler = (req: NextApiRequest, res: NextApiResponse, accsessToken: string) => Promise<void>;

export function withAuthenticatedPage(handler: PageHandler = async () => ({ props: {} })) {
    return async function withBearerToken(
        context: GetServerSidePropsContext,
    ): Promise<GetServerSidePropsResult<unknown>> {
        if (process.env.NODE_ENV !== 'production') {
            logger.info('Is running locally, skipping authentication for page');
            return await handler(context, 'Faketoken');
        }
        const authorizationHeader: string | undefined = context.req.headers['authorization'];
        if (authorizationHeader == null) {
            return { redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false } };
        }

        const validate: ValidationResult<AzureAdErrorVariants> = await validateAzureToken(authorizationHeader);
        if (validate === 'valid') {
            logger.info('Logged in :)');
            return await handler(context, authorizationHeader.replace('Bearer ', ''));
        } else {
            return { redirect: { destination: `/oauth2/login?redirect=${context.resolvedUrl}`, permanent: false } };
        }
    };
}

export function withAuthenticatedApiRoute(handler: ApiHandler) {
    return async function withBearerToken(req: NextApiRequest, res: NextApiResponse) {
        if (process.env.NODE_ENV !== 'production') {
            logger.info('Is running locally, skipping authentication for page');
            return await handler(req, res, 'fakeAccessToken');
        }
        const authorizationHeader: string | undefined = req.headers['authorization'];
        if (authorizationHeader == null) {
            return res.status(401).json({ message: 'not authorization' });
        }

        const validate: ValidationResult<AzureAdErrorVariants> = await validateAzureToken(authorizationHeader);
        if (validate === 'valid') {
            logger.info('Logged in :)');
            return handler(req, res, authorizationHeader.replace('Bearer ', ''));
        } else {
            logger.info(`Failed to validate due to: ${validate.errorType} ${validate.message}`);
            return res.status(401).json({ message: 'not authorization' });
        }
    };
}
