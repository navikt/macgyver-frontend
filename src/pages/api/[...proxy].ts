import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';

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

    const path = req.query.proxy.slice(1).join('/');
    logger.info(`baseurl + path: ${macgyverBaseUrl}/${path}`);
    const result = await fetch(`${macgyverBaseUrl}/${path}`, {
        method: req.method,
        body: getBody(req),
        headers: getHeaders(req, accessToken),
    });

    if (!result.ok) {
        logger.error('Proxy request failed');
        logger.error(`${result.status} ${result.statusText}`);
        res.status(result.status).json({ message: `Noe gikk galt: ${result.statusText}` });
        return;
    }

    res.status(result.status).json(await result.json());
};

function getBody(req: NextApiRequest): string | undefined {
    return req.method === 'GET' || req.method === 'DELETE' ? undefined : req.body;
}

function getHeaders(req: NextApiRequest, accessToken: string): Record<string, string> {
    return {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
    };
}

export default withAuthenticatedApiRoute(handler);
