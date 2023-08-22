import { NextApiRequest, NextApiResponse } from 'next';
import { logger } from '@navikt/next-logger';
import { grantAzureOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall';

import { withAuthenticatedApiRoute } from '../../auth/withAuth';

const handler = async (req: NextApiRequest, res: NextApiResponse, accessToken: string): Promise<void> => {
    const queryParams: string[] | null = (req.query.proxy ?? null) as string[] | null;

    if (!isValidQueryParams(queryParams)) {
        res.status(400).json({ message: 'Invalid request' });
        return;
    }

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

    if (!queryParams) {
        res.status(400).json({ message: 'Path is missing' });
        return;
    }

    const path: string = createPath(queryParams);
    const result: Response = await fetch(`http://macgyver/${path}`, {
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

    res.status(result.status).json(await result.json());
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

function isValidQueryParams(query: string[] | null): query is string[] | null {
    return query == null || (Array.isArray(query) && query.length >= 1);
}

function createPath(path: string[]): string {
    return path.slice(1).join('/');
}

export default withAuthenticatedApiRoute(handler);
