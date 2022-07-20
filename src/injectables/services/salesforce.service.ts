/* eslint-disable @typescript-eslint/no-empty-function */
import { AxiosInstance } from 'axios';
import { CustomLogger } from '../../logging/logger';
import { ServiceConfig } from '../../config';
import * as FormData from 'form-data';
import * as createError from 'http-errors';
interface SalesforceService {
    getAllObjects: (request: Paths.GetAllObjects.PathParameters) => Promise<any>;
    getObjectFields: (request: Paths.GetObjectFields.PathParameters) => Promise<any>;
    getEndpointData: (request: Paths.Data.PathParameters) => Promise<any>;
    getSFObjectChanges: (request: Paths.GetSFObjectChanges.PathParameters) => Promise<any>;
    createEndpoint: (request: Paths.CreateEndpoint.RequestBody) => Promise<any>;
    createSFConnection: (request: Paths.CreateSFConnection.RequestBody) => Promise<any>;
    triggerJob: (request: Paths.TriggerJob.QueryParameters, tenantId: any) => Promise<any>;
    addTemplate: (request: any) => Promise<any>;
}
class SalesforceServiceImpl implements SalesforceService {
    private config: ServiceConfig;
    private logger: CustomLogger;
    private axiosInstance: AxiosInstance;

    constructor(
        config: ServiceConfig,
        logger: CustomLogger,
        axiosInstance: AxiosInstance
    ) {
        this.config = config;
        this.logger = logger;
        this.axiosInstance = axiosInstance;
        this.axiosInstance.defaults.baseURL = this.config.apiUrl;
        this.axiosInstance.defaults.headers.common = {
            Authorization: `Basic ${this.config.bffCredentials}`,
        };
    }

    public async getAllObjects(request: Paths.GetAllObjects.PathParameters): Promise<any> {
        const logger = this.logger.operation('getAllObjects').context({
            businessValues: {
                ...request,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        const response = await this.axiosInstance.get(`/getAllObjects/${request.tenantId}`);
        const result = response.data;
        return result;
    }

    public async getObjectFields(request: Paths.GetObjectFields.PathParameters): Promise<any> {
        const logger = this.logger.operation('getObjectFields').context({
            businessValues: {
                ...request,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        const response = await this.axiosInstance.get(`/getObjectFields/${request.tenantId}/${request.objectName}`);
        const result = response.data;
        return result;
    }

    public async getEndpointData(request: Paths.Data.PathParameters): Promise<any> {
        const logger = this.logger.operation('getEndpointData').context({
            businessValues: {
                ...request,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        this.axiosInstance.defaults.baseURL = this.config.apiPublicUrl;
        const response = await this.axiosInstance.get(`/data/${request.endpointName}`);
        const result = response.data;
        return result;
    }

    public async getSFObjectChanges(request: Paths.GetSFObjectChanges.PathParameters): Promise<any> {
        const logger = this.logger.operation('getSFObjectChanges').context({
            businessValues: {
                ...request,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        const response = await this.axiosInstance.get(`/getSFObjectChanges/${request.tenantId}`);
        const result = response.data;
        return result;
    }

    public async createEndpoint(request: Paths.CreateEndpoint.RequestBody): Promise<any> {
        const logger = this.logger.operation('getSFObjectChanges').context({
            businessValues: {
                ...request,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        const response = await this.axiosInstance.post('/createEndpoint', request);
        const result = response.data;
        return result;
    }

    public async createSFConnection(request: Paths.CreateSFConnection.RequestBody): Promise<any> {
        const logger = this.logger.operation('getSFObjectChanges').context({
            businessValues: {
                ...request,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        const response = await this.axiosInstance.post('/createSFConnection', request);
        const result = response.data;
        return result;
    }

    public async triggerJob(request: Paths.TriggerJob.QueryParameters, tenantId: any): Promise<any> {
        const logger = this.logger.operation('triggerJob').context({
            businessValues: {
                ...request,
                tenantId,
            },
        });
        logger.context({ callDetails: { request: request } }).debug('Request data');
        const response = await this.axiosInstance.get('/triggerJob', {
            headers: {
                'tenantid': tenantId,
            },
            params: {
                ...request,
            },
        });
        const result = response.data;
        return result;
    }

    public async addTemplate(request: any): Promise<any> {
        const logger = this.logger.operation('addTemplate').context({
            businessValues: {
                ...request.file,
            },
        });
        logger.context({ callDetails: { request: request.file } }).debug('Request data');
        if (!request.file) {
            throw new createError.BadRequest('Please upload file');
        }
        const formData = new FormData();
        formData.append('excelFile', request.file.buffer, request.file.originalname);
        const response = await this.axiosInstance.post('/addTemplate', formData, {
            headers: formData.getHeaders(),
        });
        const result = response.data;
        return result;
    }
}

export { SalesforceService, SalesforceServiceImpl };
