import { axiosErrorConverter } from './error.utils';
import * as createError from 'http-errors';

class MockLogger {
    operation() {
        return this;
    }
    context() {
        return this;
    }
    error() {
        return this;
    }
}

describe('Utils', () => {
    const logger = new MockLogger() as any;

    it('Should extract error message', () => {
        expect(axiosErrorConverter(null as any, logger)).toEqual(
            new createError.InternalServerError('An unexpected error occurred')
        );

        expect(axiosErrorConverter({ data: 'some data' } as any, logger)).toEqual(
            new createError.InternalServerError()
        );

        expect(
            axiosErrorConverter({ data: 'some data', message: 'test error message' } as any, logger)
        ).toEqual(new createError.InternalServerError('test error message'));

        expect(axiosErrorConverter({ response: { status: 400 } } as any, logger)).toEqual(
            new createError.BadRequest()
        );

        expect(
            axiosErrorConverter(
                { response: { status: 400, data: { message: 'test error message' } } } as any,
                logger
            )
        ).toEqual(new createError.BadRequest('test error message'));

        expect(
            axiosErrorConverter(
                { response: { status: 400, data: 'some test error' } } as any,
                logger
            )
        ).toEqual(new createError.BadRequest('some test error'));

        expect(
            axiosErrorConverter(
                {
                    response: { status: 400, data: { errors: ['error1', 'error2'] } },
                } as any,
                logger
            )
        ).toEqual(new createError.BadRequest('{"errors":["error1","error2"]}'));

        expect(
            axiosErrorConverter(
                {
                    response: {
                        status: 400,
                        data: {
                            statusCode: 400,
                            error: 'Bad Request',
                            messages: [
                                'Validation failed',
                                'interactionManagementStatus must be a valid enum value',
                            ],
                        },
                    },
                } as any,
                logger
            )
        ).toEqual(
            new createError.BadRequest(
                '{"statusCode":400,"error":"Bad Request","messages":["Validation failed","interactionManagementStatus must be a valid enum value"]}'
            )
        );

        expect(
            axiosErrorConverter(
                {
                    response: {
                        status: 400,
                        data: {
                            statusCode: 400,
                            error: 'Bad Request',
                            message: [
                                'Validation failed',
                                'interactionManagementStatus must be a valid enum value',
                            ],
                        },
                    },
                } as any,
                logger
            )
        ).toEqual(
            new createError.BadRequest(
                JSON.stringify([
                    'Validation failed',
                    'interactionManagementStatus must be a valid enum value',
                ])
            )
        );

        expect(
            axiosErrorConverter(
                {
                    response: { status: 404, data: { statusCode: 404, message: '' } },
                } as any,
                logger
            )
        ).toEqual(new createError.NotFound('{"statusCode":404,"message":""}'));

        expect(axiosErrorConverter({ request: {} } as any, logger)).toEqual(
            new createError.InternalServerError('No response was received from service')
        );
    });
});
