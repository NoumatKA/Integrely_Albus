import { Logger } from '../../logging/logger';
import * as rTracer from 'cls-rtracer';
import { PARENT_ID_HEADER, REQUEST_ID_HEADER } from '../../middleware/context-id-middleware';

/**
 * e.g.:  this.axiosIntance.interceptors.request.use(RequestInterceptor(false, this.logger));
 * It needs the logger as dependency plus a flag if http headers shall be
 * @param enableTrace indicates if trace headers need to be propagated to the downstream service.
 *  This has to be clarified with downstream service if headers can be further processed.
 * @param logger the logger to be used
 * @returns axios config
 */
export const requestLoggerInterceptor = function(enableTrace: boolean, logger: Logger) {
    return function (config): any {
        if (enableTrace) {    // header shall be disabled if downstream service is outside BFF
            const ids: any = rTracer.id();
            config.headers[REQUEST_ID_HEADER] = ids.request,
            config.headers[PARENT_ID_HEADER] = ids.local;
        }
        logger.info('Executing call');
        return config;
    };
};
