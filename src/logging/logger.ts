import { CustomLogger } from './logger.impl';
import { ErrorLogEntry, Context } from './models';

export { ErrorLogEntry as ErrorEntry, Context } from './models';

export { CustomLogger } from './logger.impl';

export interface Logger {
    operation(obj: string);
    context(obj: Context): Logger;
    info(message: string);
    debug(message: string);
    error(message: ErrorLogEntry);
    warn(message: string);
}

export const serviceLogger = new CustomLogger();
