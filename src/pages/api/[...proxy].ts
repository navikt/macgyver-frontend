import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';

import { withAuthenticatedApiRoute } from '../../auth/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse, accessToken: string): Promise<void> => {
    if (!Array.isArray(req.query.proxy)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

    if (process.env.NODE_ENV !== 'production') {
        res.status(200).json({ message: 'Jobber lokalt, 200 ok læll' });
        return;
    }

    const macgyverBaseUrl = 'http://macgyver';

    const oboToken = await grantAzureOboToken(accessToken, process.env.MACGYVER_BACKEND_SCOPE ?? 'scope not set');
    if (isInvalidTokenSet(oboToken)) {
        logger.error(oboToken.message);
        res.status(400).json({ message: 'Not valid' });
        return;
    }

    const path = req.query.proxy.slice(1).join('/');
    const result = await fetch(`${macgyverBaseUrl}/${path}`, {
        method: req.method,
        body: getBody(req),
        headers: getHeaders(req, oboToken),
    });

    if (!result.ok) {
        logger.error('Proxy request failed');
        logger.error(`${result.status} ${result.statusText}`);
        res.status(result.status).json({ message: `Noe gikk galt: ${result.statusText}` });
        return;
    }

    if (req.method === 'DELETE') {
        logger.info('DELETE method, only show repsone status and statusText');
        res.status(result.status).json({ message: result.statusText });
    } else {
        res.status(result.status).json(await result.json());
    }
};

function getBody(req: NextApiRequest): string | undefined {
    return req.method === 'GET' || req.method === 'DELETE' ? undefined : req.body;
}

function getHeaders(req: NextApiRequest, accessToken: string): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
    };
}

export default withAuthenticatedApiRoute(handler);
