/* eslint-disable @typescript-eslint/naming-convention */
import { expressMiddleware } from 'cls-rtracer';
import { v1 as uuidv1 } from 'uuid';

// http headers to be received and sent downstream for logging and tracing
export const REQUEST_ID_HEADER = 'x-request-id';

export const PARENT_ID_HEADER = 'x-bff-parent-id';

export const LOCAL_ID_HEADER = 'x-bff-local-id';

// middleware that creates the ids if not present in the headers so
// ids are now avalailable for the application to be used for logging purposes.
export const busContextIdMiddleware = expressMiddleware({
    requestIdFactory: req => ({
        request: req.headers[REQUEST_ID_HEADER] || uuidv1(),
        parent: req.headers[PARENT_ID_HEADER] || uuidv1(),
        local: uuidv1(),
    }),
});
