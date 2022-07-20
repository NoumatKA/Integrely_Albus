/* eslint-disable @typescript-eslint/naming-convention */
/// <reference path="generated/models.ts" />
import { config } from 'dotenv';
config();
import {
    healthCheck,
    beforeMiddleware,
    getAllObjects,
    getObjectFields,
    data as getEndpointData,
    getSFObjectChanges,
    createEndpoint,
    createSFConnection,
    triggerJob,
    addTemplate,
} from './generated/app';
import { requestValidatorMiddleware } from './middleware/request-validator-middleware';
import { busContextIdMiddleware } from './middleware/context-id-middleware';
import { getServiceConfig } from './config';
import { getSalesforceService } from './injectables/component-injection';
import { extractApiKeyFromHeader } from './utils/common.utils';
import * as Multer from 'multer';

const multer = Multer({ storage: Multer.memoryStorage() });

// Validation check to interrupt the startup process if not all required variables are properly configured
getServiceConfig();
/**
 * Here you can assign you application level middleware.
 * Just chain it like it is shown below:
 *
 * beforeMiddleware.push(customMiddleWare1, customMiddleWare2, ...);
 * afterMiddleware.push(customMiddleWare1, customMiddleWare2, ...);
 */
// This is context id middleware.
// It will check if incoming request has the http header set for the correlation Id.
// It will take the value and store it in async local storage to be used in logging.
// It will also respond with the header, and if none was set in incoming request,
// it will generate a new uuid for logging and optionally use for downstream call.
beforeMiddleware.push(busContextIdMiddleware);
// This is request validation middleware.
// It validates request parameters according to OpenAPI specification
// it should be declared before all the routes are assigned.
// Please make sure you define `servers` property in your OpenAPI specification.
// The middleware will not work correctly without it!!!
beforeMiddleware.push(requestValidatorMiddleware);

beforeMiddleware.push(extractApiKeyFromHeader);

healthCheck();

getAllObjects(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.getAllObjects(req.params);
});

getObjectFields(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.getObjectFields(req.params);
});

getEndpointData(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.getEndpointData(req.params);
});

getSFObjectChanges(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.getSFObjectChanges(req.params);
});

createEndpoint(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.createEndpoint(req.body);
});

createSFConnection(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.createSFConnection(req.body);
});

triggerJob(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.triggerJob(req.query, req.headers.tenantid);
});

beforeMiddleware.push(multer.single('excelFile'));
addTemplate(async (req, _, salesforceService = getSalesforceService()) => {
    return salesforceService.addTemplate(req);
});
