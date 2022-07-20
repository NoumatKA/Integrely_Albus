import { Logger } from '../../logging/logger';
import { axiosErrorConverter } from '../../utils/error.utils';

/**
 * It needs the logger as dependency so it can be used by the underlying error converter.
 */
export const requestErrorInterceptor = function(logger: Logger) {
    return function(error: any): any {
        return Promise.reject(axiosErrorConverter(error, logger));
    };
};
