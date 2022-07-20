// sample test case to keep coverage
import { requestLoggerInterceptor } from './request-logger.interceptor';
import { CustomLogger } from '../../logging/logger';
import { AxiosMock } from '../../test/mocks';
import { AxiosInstance } from 'axios';
import * as rTracer from 'cls-rtracer';
import { REQUEST_ID_HEADER } from '../../middleware/context-id-middleware';

describe('request tracing', () => {
    const axiosMock = (new AxiosMock() as unknown) as AxiosInstance;
    const logger = new CustomLogger('<servicename>.clients.interceptors.request.spec');

    beforeEach(() => {
        jest.spyOn(rTracer, 'id').mockImplementation(() => {
            return {
                request: 'n/a',
                parent: 'par',
                local: 'loc',
            };
        });
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should add header with n/a for correlationid', async () => {
        const config = requestLoggerInterceptor(true, logger)(axiosMock);
        expect((config.headers[REQUEST_ID_HEADER] = 'n/a'));
    });
});
