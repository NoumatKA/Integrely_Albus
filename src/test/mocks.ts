/* eslint-disable @typescript-eslint/naming-convention */
import { Logger } from '../logging/logger';

// Mocks meant to use in testing along with jest.spyOn
export class AxiosMock {
    public baseURL = '';
    public defaults = {
        baseURL: '',
        headers: {},
    };
    public headers = {
        'Content-Type': 'application/json',
    };

    post = () => Promise.resolve({});
    get = () => Promise.resolve({});
    patch = () => Promise.resolve({});
    put = () => Promise.resolve({});
}

export class MockLogger implements Logger {
    operation() {
        return this;
    }
    context() {
        return this;
    }
    error() {
        return this;
    }
    info() {
        return this;
    }
    debug() {
        return this;
    }
    warn() {
        return this;
    }
}
