declare namespace Components {
    namespace Schemas {
        export interface GetSFObjectChanges200 {
            data?: {
                id?: number;
                tenantId?: string;
                deltas?: string;
                changesCount?: number;
                createdAt?: string; // date-time
            }[];
        }
        export interface ObjectFields200 {
            fields?: {
                id?: number;
                name?: string;
                type?: string;
            }[];
            childRelationships?: {
                childSObject?: string;
                fields?: string;
            }[];
        }
        export interface TriggerJob200 {
            totalInputRecords?: number;
            totalProcessed?: number;
            success?: {
                id?: string;
                success?: boolean;
                errors?: string[];
                created?: boolean;
            }[];
            failure?: {
                status?: number;
                message?: string;
            }[];
        }
        export interface TriggerJob201 {
            totalInputRecords?: number;
            totalProcessed?: number;
            jobId?: string;
        }
        export interface TriggerJob404 {
            status?: number;
            message?: string;
        }
    }
}
declare namespace Paths {
    namespace AddTemplate {
        export interface RequestBody {
            excelFile?: string; // binary
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
            }
        }
    }
    namespace CreateEndpoint {
        export interface RequestBody {
            name?: string;
            method?: 1 | 2;
            sourceId?: string;
            json?: string;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
            }
        }
    }
    namespace CreateSFConnection {
        export interface RequestBody {
            tenantId?: string;
            sourceName?: string;
            clientSecret?: string;
            username?: string;
            password?: string;
            baseUrl?: string;
            clientId?: string;
        }
        namespace Responses {
            export interface $200 {
                success?: boolean;
            }
        }
    }
    namespace Data {
        namespace Parameters {
            export type EndpointName = string;
        }
        export interface PathParameters {
            endpointName: Parameters.EndpointName;
        }
        namespace Responses {
            export type $200 = {
                [key: string]: any;
            }[];
        }
    }
    namespace GetAllObjects {
        namespace Parameters {
            export type TenantId = string;
        }
        export interface PathParameters {
            tenantId: Parameters.TenantId;
        }
        namespace Responses {
            export type $200 = string[];
        }
    }
    namespace GetObjectFields {
        namespace Parameters {
            export type ObjectName = string;
            export type TenantId = string;
        }
        export interface PathParameters {
            tenantId: Parameters.TenantId;
            objectName: Parameters.ObjectName;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ObjectFields200;
        }
    }
    namespace GetSFObjectChanges {
        namespace Parameters {
            export type TenantId = string;
        }
        export interface PathParameters {
            tenantId: Parameters.TenantId;
        }
        namespace Responses {
            export type $200 = Components.Schemas.GetSFObjectChanges200;
        }
    }
    namespace TriggerJob {
        export interface HeaderParameters {
            tenantid: Parameters.Tenantid;
        }
        namespace Parameters {
            export type JobName = string;
            export type JobType = string;
            export type Tenantid = string;
        }
        export interface QueryParameters {
            jobName: Parameters.JobName;
            jobType: Parameters.JobType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.TriggerJob200;
            export type $201 = Components.Schemas.TriggerJob201;
            export type $404 = Components.Schemas.TriggerJob404;
        }
    }
}
