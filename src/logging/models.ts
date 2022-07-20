export interface ErrorLogEntry {
    message: string;
    code: string;
    context?: Context;
    details: any;
}

export interface CallDetails {
    service?: string;
    response?: any;
    request?: any;
}

export interface Context {
    businessValues?: Record<string, any>;
    callDetails?: CallDetails;
}
