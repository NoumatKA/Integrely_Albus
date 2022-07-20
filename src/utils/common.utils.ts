import { IncomingHttpHeaders } from 'http';
import { getServiceConfig } from '../config';

export const extractApiKeyFromHeader = async (req: any, res: any, next) => {
    const headers: IncomingHttpHeaders = req.headers;
    const apiKey = headers['x-api-key'];
    if (!apiKey) {
        return res.status(400).send({ message: 'x-api-key is missing' });
    } else if (apiKey !== getServiceConfig().apiKey) {
        return res.status(401).send({ message: 'x-api-key is Invalid' });
    }
    return next();
};
