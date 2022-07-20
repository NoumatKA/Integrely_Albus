import { CustomLogger } from './logger';
import { logOutputTestData } from '../test/logger-data';
import * as winston from 'winston';
import * as rTracer from 'cls-rtracer';

describe('test custom logging', () => {
    const mockStdoutWrite = jest.spyOn(process.stdout, 'write').mockImplementation(() => {
        return true;
    });

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
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should add additional transport ', async () => {
        const logger = new CustomLogger('info_wo_context_op', [new winston.transports.Console()]);

        logger.info('log message');

        let argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(logOutputTestData.info_wo_context_op);

        argument = mockStdoutWrite.mock.calls[1][0];

        expect(JSON.parse(argument as string)).toEqual(logOutputTestData.info_wo_context_op);
    });

    it('should error log without context object', async () => {
        const logger = new CustomLogger('err_wo_context');

        logger.error({ code: 'e101', message: 'error occured', details: 'stacktrace' });

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.err_wo_context
        );
    });

    it('should log without context object', async () => {
        const logger = new CustomLogger('info_wo_context').operation('testop');

        logger.info('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.info_wo_context
        );
    });

    it('should log with context object', async () => {
        const logger = new CustomLogger('info_wi_bc');
        const log1 = logger.context({ businessValues: { val1: 'val1' } });

        log1.info('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.info_wi_bc
        );
    });

    it('should log concatenated businessValues context object', async () => {
        const logger = new CustomLogger('info_wi_bc2');
        const log1 = logger.context({ businessValues: { val1: 'val1' } });
        const log2 = log1.context({ businessValues: { val2: 'val2' } });

        log2.info('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.info_wi_bc2
        );
    });

    it('should log concatenated context object 1', async () => {
        const logger = new CustomLogger('info_wi_cont1');
        const log1 = logger.context({ callDetails: { request: { req1: 'req1' } } });
        const log2 = log1.context({ businessValues: { val1: 'val1' } });

        log2.info('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.info_wi_cont1
        );

    });

    it('should log concatenated context object 2', async () => {
        const logger = new CustomLogger('info_wi_cont2');
        const log1 = logger.context({ businessValues: { val1: 'val1' } });
        const log2 = log1.context({ callDetails: { request: { req1: 'req1' } } });

        log2.info('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.info_wi_cont2
        );
    });

    it('should warn log only latest request object', async () => {
        const logger = new CustomLogger('warn_wi_req');

        const log1 = logger.context({ callDetails: { request: { req1: 'req1' } } });
        const log2 = log1.context({ callDetails: { request: { req2: 'req2' } } });
        log2.warn('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.warn_wi_req
        );
    });

    it('should warn log with response object', async () => {
        const logger = new CustomLogger('warn_wi_resp');

        const log1 = logger.context({ callDetails: { response: { resp: 'resp' } } });
        log1.warn('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.warn_wi_resp
        );
    });

    it('should debug log with callDetails', async () => {
        const logger = new CustomLogger('debug_wi_call');

        const log1 = logger.context({ callDetails: { service: 'service' } });
        log1.debug('log message');

        const argument = mockStdoutWrite.mock.calls[0][0];

        expect(JSON.parse(argument as string)).toEqual(
            logOutputTestData.debug_wi_call
        );
    });
});
