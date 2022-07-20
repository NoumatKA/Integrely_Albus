import { REQUEST_ID_HEADER, LOCAL_ID_HEADER, PARENT_ID_HEADER } from '../middleware/context-id-middleware';

export const logOutputTestData: any = {
    info_wo_context_op: {
        context: {
            component: 'info_wo_context_op',
        },
        level: 'info',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    info_wo_context: {
        context: { component: 'info_wo_context', operation: 'testop' },
        level: 'info',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    info_wi_bc: {
        context: { component: 'info_wi_bc', businessValues: { val1: 'val1' } },
        level: 'info',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    info_wi_bc2: {
        context: { component: 'info_wi_bc2', businessValues: { val1: 'val1', val2: 'val2' } },
        level: 'info',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    info_wi_cont1: {
        context: {
            component: 'info_wi_cont1',
            callDetails: { request: { req1: 'req1' } },
            businessValues: { val1: 'val1' },
        },
        level: 'info',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    info_wi_cont2: {
        context: {
            component: 'info_wi_cont2',
            businessValues: { val1: 'val1' },
            callDetails: { request: { req1: 'req1' } },
        },
        level: 'info',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    warn_wi_req: {
        context: {
            component: 'warn_wi_req',
            callDetails: {
                request: { req2: 'req2' },
            },
        },
        level: 'warn',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    warn_wi_resp: {
        context: {
            component: 'warn_wi_resp',
            callDetails: {
                response: { resp: 'resp' },
            },
        },
        level: 'warn',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    debug_wi_call: {
        context: {
            component: 'debug_wi_call',
            callDetails: { service: 'service' },
        },
        level: 'debug',
        message: 'log message',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
    err_wo_context: {
        error: { code: 'e101', details: 'stacktrace' },
        context: { component: 'err_wo_context' },
        level: 'error',
        message: 'error occured',
        [REQUEST_ID_HEADER]: 'n/a',
        [LOCAL_ID_HEADER]: 'loc',
        [PARENT_ID_HEADER]: 'par',
    },
};
