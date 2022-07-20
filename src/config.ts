import { serviceLogger } from './logging/logger';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceConfig {
    bffCredentials: string;
    apiUrl: string;
    apiPublicUrl: string;
    apiKey: string;
}

export const getServiceConfig = (): ServiceConfig => {
    return {
        bffCredentials: generateCredentials(getEnvVariable('BFF_USER'), getEnvVariable('BFF_PASSWORD')),
        apiUrl: getEnvVariable('API_URL'),
        apiPublicUrl: getEnvVariable('API_PUBLIC_URL'),
        apiKey: getEnvVariable('API_KEY'),
    };
};

const generateCredentials = (username, password): string => {
    if (!username || !password) {
        const errorMessage =
        'Error generating service config: both username and password must be properly set';
        throw new Error(errorMessage);
    }

    return Buffer.from(`${username}:${password}`).toString('base64');
};

/**
 * Given a variable name it returns the environment variable value.
 * An error is thrown if variable cannot be found and is not set as optional.
 * @param variableName
 * @param isOptional
 * @returns
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getEnvVariable = (variableName: string, isOptional = false): string => {
    const value = process.env[variableName] as string;
    if (!value && !isOptional) {
        serviceLogger.error({
            message: `Error generating service config: Mandatory env variable ${variableName} not found`,
            code: '',
            details: undefined,
        }
        );
        throw new Error('Error generating service config please check service logs');
    }
    return value;
};
