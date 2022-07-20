/// <reference path="models.ts" />

import * as express from 'express';
import * as fs from 'fs';
import { IncomingHttpHeaders } from 'http';
import { HttpError } from 'http-errors';

const apiJson = JSON.parse(fs.readFileSync('./src/generated/service.openapi.json').toString());
const serviceJson = JSON.parse(fs.readFileSync('./service.json').toString());
const manual = fs.readFileSync('./SERVICE.md').toString();
const changelog = fs.readFileSync('./CHANGELOG.md').toString();
const risklog = fs.readFileSync('./RISKLOG.md').toString();

export const app = express();

export const beforeMiddleware = [] as any;

export const afterMiddleware = [] as any;

const port = process.env.PORT || 8080;

app.listen(port, () => {
    // Notify the developer
    console.log(`The service has been started successfully on port ${port}!`);
    // List all routes
    app._router.stack.filter(r => r.route).map(r => {
        const method = Object.keys(r.route.methods)[0];
        const path = `http://localhost:${port}${r.route.path}`;
        const formatString = '\x1b[36m%s\x1b[0m\t\x1b[33m%s\x1b[0m';
        console.log(formatString, method, path);
    });
});

app.use(express.json({ limit: '1mb', inflate: true }));

// Define default routes
app.get('/BFF_Client_API/portal/api', (req, res) => res.send(apiJson));
app.get('/BFF_Client_API/portal/manual', (req, res) => res.send(manual));
app.get('/BFF_Client_API/portal/changelog', (req, res) => res.send(changelog));
app.get('/BFF_Client_API/portal/risklog', (req, res) => res.send(risklog));
app.get('/BFF_Client_API/portal/config', (req, res) => res.send(serviceJson));

export const healthCheck = () => app.get('/BFF_Client_API/health', (req, res) => res.send('Healthy'));

export const triggerJob = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: any;
    query: Paths.TriggerJob.QueryParameters;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200 | 201 | 404) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.TriggerJob.Responses.$200 | Paths.TriggerJob.Responses.$201 | Paths.TriggerJob.Responses.$404>) =>
    app.get(
        '/BFF_Client_API/triggerJob',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const getAllObjects = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.GetAllObjects.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.GetAllObjects.Responses.$200>) =>
    app.get(
        '/BFF_Client_API/getAllObjects/:tenantId',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const getObjectFields = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.GetObjectFields.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.GetObjectFields.Responses.$200>) =>
    app.get(
        '/BFF_Client_API/getObjectFields/:tenantId/:objectName',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const createEndpoint = (action: (req: {
    body: Paths.CreateEndpoint.RequestBody;
    headers: IncomingHttpHeaders;
    params: any;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.CreateEndpoint.Responses.$200>) =>
    app.post(
        '/BFF_Client_API/createEndpoint',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const createSFConnection = (action: (req: {
    body: Paths.CreateSFConnection.RequestBody;
    headers: IncomingHttpHeaders;
    params: any;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.CreateSFConnection.Responses.$200>) =>
    app.post(
        '/BFF_Client_API/createSFConnection',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const getSFObjectChanges = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.GetSFObjectChanges.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.GetSFObjectChanges.Responses.$200>) =>
    app.get(
        '/BFF_Client_API/getSFObjectChanges/:tenantId',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const data = (action: (req: {
    body: any;
    headers: IncomingHttpHeaders;
    params: Paths.Data.PathParameters;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.Data.Responses.$200>) =>
    app.get(
        '/BFF_Client_API/data/:endpointName',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );

export const addTemplate = (action: (req: {
    body: Paths.AddTemplate.RequestBody;
    headers: IncomingHttpHeaders;
    params: any;
    query: any;
    get: (field: string, value?: any) => any;
    [key: string]: any;
}, res: {
        status: (code: 200) => typeof res;
        header: (field: string, value?: any) => typeof res;
        set: (field: string, value?: any) => typeof res;
        [key: string]: any;
    }) => Promise<Paths.AddTemplate.Responses.$200>) =>
    app.post(
        '/BFF_Client_API/addTemplate',
        ...beforeMiddleware,
        async (req: any, res: any, next) => {
            try {
                res.send(await action(req, res));
                next();
            } catch (err) {
                if (err instanceof HttpError) {
                    res.status(err.statusCode).send(err);
                } else {
                    res.status(500).send({
                        name: err.name,
                        message: err.message,
                    });
                }
                next(err);
            }
        },
        ...afterMiddleware,
    );
