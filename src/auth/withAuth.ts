import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { AzureAdErrorVariants, validateAzureToken, ValidationResult } from '@navikt/next-auth-wonderwall';
import { logger } from '@navikt/next-logger';

type PageHandler = (
    context: GetServerSidePropsContext,
    accessToken: string,
) => Promise<GetServerSidePropsResult<unknown>>;

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
