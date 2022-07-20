/* eslint-disable @typescript-eslint/no-unused-vars */
import { getAxiosInstance, getConfig, getLogger } from './component-injection';
import * as loggerInterceptor from '../interceptor/request-logger/request-logger.interceptor';
import * as errorInterceptor from '../interceptor/request-error/request-error.interceptor';
import * as config from '../config';
import { serviceConfigMock } from '../test/data';
jest.mock('../logging/logger');

describe('component injection', () => {
    let requestLoggerInterceptorSpy;
    let requestErrorInterceptorSpy;
    let configSpy;

    beforeAll(() => {
        requestLoggerInterceptorSpy = jest
            .spyOn(loggerInterceptor, 'requestLoggerInterceptor');
        requestErrorInterceptorSpy = jest.spyOn(errorInterceptor, 'requestErrorInterceptor');
        configSpy = jest.spyOn(config, 'getServiceConfig');
    });

    beforeEach(() => {
        requestLoggerInterceptorSpy.mockImplementation((enableTrace, logger, operation) => (config) => Promise.resolve('request logger'));
        configSpy.mockReturnValue(serviceConfigMock);
        requestErrorInterceptorSpy.mockImplementation((logger) => (error) => Promise.reject('error'));
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('get Axios Instance', () => { // These tests are only to prove that interceptor injection works properly
        it('should call error interceptor if error in request', async () => {
            const axiosInstance = getAxiosInstance() as any;
            expect.assertions(1);
            await axiosInstance.interceptors.request?.handlers[0].rejected({}).catch(err => {
                expect(err).toEqual('error');
            });
        });

        it('should call error interceptor if error in response', async () => {
            const axiosInstance = getAxiosInstance() as any;
            expect.assertions(1);
            await axiosInstance.interceptors.response?.handlers[0].rejected({}).catch(err => {
                expect(err).toEqual('error');
            });
        });

        it('should call logger interceptor in request', async () => {
            const axiosInstance = getAxiosInstance() as any;
            expect.assertions(1);
            await axiosInstance.interceptors.request?.handlers[0].fulfilled({}).then(res => {
                expect(res).toEqual('request logger');
            });
        });
    });

    describe('get Config', () => {
        it('should get config', () => {
            expect.assertions(2);
            getConfig() as any;
            // first time should call to getServiceConfig
            expect(configSpy).toHaveBeenCalledTimes(1);

            // second time should return same instance
            getConfig() as any;

            expect(configSpy).toHaveBeenCalledTimes(1);
        });
    });
});
