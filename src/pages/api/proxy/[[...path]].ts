import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';

import { withAuthenticatedApiRoute } from '../../../auth/withAuth';
import {proxyApiRouteRequest} from "@navikt/next-api-proxy";

const handler = async (req: NextApiRequest, res: NextApiResponse, accessToken: string): Promise<void> => {
    if (process.env.NODE_ENV !== 'production') {
        res.status(200).json({ message: 'Jobber lokalt, 200 ok læll' });
        return;
    }

    const oboToken = await grantAzureOboToken(accessToken, process.env.MACGYVER_BACKEND_SCOPE ?? 'scope not set');
    if (isInvalidTokenSet(oboToken)) {
        logger.error(oboToken.message);
        res.status(400).json({ message: 'Not valid' });
        return;
    }
    const rewrittenPath = req.url!.replace(`/api/proxy`, '')

    await proxyApiRouteRequest({
        path: rewrittenPath,
        req,
        res,
        bearerToken: oboToken,
        hostname: 'macgyver',
        https: false,
    })
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default withAuthenticatedApiRoute(handler);
