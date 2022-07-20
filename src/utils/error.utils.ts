// Function that extracts error information from axios errors and returns the status and an the errorMessage as a valid service error response. It also logs the error information.

import { AxiosError } from 'axios';
import * as createError from 'http-errors';
import { Logger } from '../logging/logger';

const generateError = (status: number, message?: string): createError.HttpError => {
    if (typeof message === 'string') {
        return createError(status, message);
    }
    return createError(status);
};

// function is based on an example provided in axios documentation
export const axiosErrorConverter = (error: AxiosError, logger: Logger): createError.HttpError => {
    if (error) {
        if (error.response) {
            const { status, data }: { status: number, data: any } = error.response;
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            logger
                .operation('error-handler')
                .error({ message: 'An error occurred', code: '' + status, details: data });
            return generateError(
                status,
                data?.message
                    ? typeof data.message === 'string'
                        ? data.message
                        : JSON.stringify(data.message)
                    : typeof data === 'string' ? data : data ? JSON.stringify(data) : undefined
            );
        } else if (error.request) {
            // The request was made but no response was received. Since there is no response no information can be extracted
            logger.operation('error-handler').error({
                message: 'An error occurred and no response was received from service',
                code: '500',
                details: error.request,
            });
            return generateError(500, 'No response was received from service');
        } else {
            // Something happened in setting up the request that triggered an Error
            logger.operation('error-handler').error({
                message: 'An error occurred while setting up the request',
                code: '500',
                details: error.message,
            });
            return generateError(500, error.message);
        }
    }
    logger.operation('error-handler').error({
        message: 'An unexpected error occurred',
        code: '500',
        details: 'No details could be found',
    });
    return generateError(500, 'An unexpected error occurred');
};
