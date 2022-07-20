import * as winston from 'winston';
import * as rTracer from 'cls-rtracer';
import { ErrorLogEntry, Context } from './models';
import { Logger } from './logger';
import { LOCAL_ID_HEADER, PARENT_ID_HEADER, REQUEST_ID_HEADER } from '../middleware/context-id-middleware';

// combine winston log entry with trace id
const format = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format((logEntry: any) => {
        const ids : any = rTracer.id();
        const trace = {
            [REQUEST_ID_HEADER]: ids?.request || 'n/a',
            [LOCAL_ID_HEADER]: ids?.local || 'n/a',
            [PARENT_ID_HEADER]: ids?.parent || 'n/a',
        };
        const json = Object.assign(logEntry, trace);
        logEntry[Symbol.for('message')] = JSON.stringify(json);
        return logEntry;
    })()
);

function mergeContext (obj1: Context, obj2: Context): Context {
    const ctx = obj1;
    if (obj1.businessValues && obj2.businessValues) {
        ctx.businessValues = { ...obj1.businessValues, ...obj2.businessValues };
    } else {
        if (obj2.businessValues) {
            ctx.businessValues = obj2.businessValues;
        }
    }
    if (obj2.callDetails) {
        ctx.callDetails = obj2.callDetails;
    }
    return ctx;
}

export class CustomLogger implements Logger {
    logger: winston.Logger;
    ctxObj: any;

    constructor (component?: string, transports?: winston.transport[]) {
        const winstonTransports: winston.transport[] = [new winston.transports.Console()];

        if (transports) {
            winstonTransports.push(...transports);
        }

        this.logger = winston.createLogger({
            level: process.env.STAGE === 'prod' ? 'info' : 'debug',
            format: format,
            transports: winstonTransports,
        });
        this.ctxObj = { component: component ? component : '' };
    }

    operation (obj: string): CustomLogger {
        const l = new CustomLogger();
        l.logger = this.logger;
        l.ctxObj = { ...this.ctxObj, operation: obj };
        return l;
    }

    context (obj: Context): Logger {
        const l = new CustomLogger();
        l.logger = this.logger;
        l.ctxObj = mergeContext(this.ctxObj, obj);
        return l;
    }

    // wrapping the winston function to allow for multiple arguments
    info (msg: string) {
        this.logger.info(msg, { context: this.ctxObj });
    }

    debug (msg: string) {
        this.logger.debug(msg, { context: this.ctxObj });
    }

    error (msg: ErrorLogEntry) {
        this.logger.error(msg.message, {
            error: {
                code: msg.code,
                details: msg.details,
            },
            context: {
                ...this.ctxObj,
            },
        });
    }

    warn (msg: string) {
        this.logger.warn(msg, { context: this.ctxObj });
    }
}
