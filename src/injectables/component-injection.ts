import axios, { AxiosInstance } from 'axios';
import { getServiceConfig, ServiceConfig } from '../config';
import { CustomLogger } from '../logging/logger';
import { requestLoggerInterceptor } from '../interceptor/request-logger/request-logger.interceptor';
import { requestErrorInterceptor } from '../interceptor/request-error/request-error.interceptor';
import { SalesforceService } from './services/salesforce.service';
import { SalesforceServiceImpl } from './services';

let serviceConfig: ServiceConfig;

export function getConfig() {
    if (serviceConfig) {
        return serviceConfig;
    }
    serviceConfig = getServiceConfig();
    return serviceConfig;
}

// This is an example of an axios instance that can be used by the clients and it will properly handle any error.
/**
 * This instance uses error interceptors to avoid boilerplate code in error handlers.
 * When using this instance just bubble up the errors, they are already properly shaped and can be handled by albus.
 * In case some change needs to be done in the error structure please modify the function `axiosErrorConverter`.
 * It also includes a request logger interceptor so all incoming requests are logged and if enableTrace is set to true
 * trace headers will be included and sent over.
 * @param enableTrace indicates if trace headers need to be propagated to the downstream service, by default false.
 * @returns Axios instance to be used in the client.
 */
export function getAxiosInstance(enableTrace = false): AxiosInstance {
    const axiosInstance = axios.create();
    // Default interceptors
    // Further interceptors can be provided if needed, they can be added either here or just creating an specific axios instance and adding them there.
    axiosInstance.interceptors.request.use(
        requestLoggerInterceptor(enableTrace, getLogger('request-logger.interceptor.ts')),
        requestErrorInterceptor(getLogger('request-error.interceptor.ts'))
    );
    axiosInstance.interceptors.response.use(
        undefined,
        requestErrorInterceptor(getLogger('request-error.interceptor.ts'))
    );

    return axiosInstance;
}

/**
 * Method to create and instance of the logger (simulates a kind of basic injection).
 * Enhance code de-coupling as no there is no longer any reference to CustomLogger in the code.
 * Any instance that extends CustomLogger can be returned here, also mocked ones.
 *
 * @returns an instance of the CustomLogger
 */
export function getLogger(component: string): CustomLogger {
    return new CustomLogger(component);
}

export function getSalesforceService(): SalesforceService {
    return new SalesforceServiceImpl(
        getConfig(),
        getLogger('salesforce.service.impl'),
        getAxiosInstance(),
    );
}
