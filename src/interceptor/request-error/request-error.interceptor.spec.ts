import { requestErrorInterceptor } from './request-error.interceptor';
import { CustomLogger } from '../../logging/logger';
import * as errorUtils from '../../utils/error.utils';

describe('error interceptor', () => {
    const logger = new CustomLogger('<servicename>.clients.interceptors.request.spec');
    const errorObjet = { error: 'some-error' };
    let axiosErrorConverterSpy;

    beforeAll(() => {
        axiosErrorConverterSpy = jest.spyOn(errorUtils, 'axiosErrorConverter');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should call error interceptor with axios error and logger instance', () => {
        axiosErrorConverterSpy.mockReturnValue({} as any);
        const response = requestErrorInterceptor(logger)(errorObjet);
        expect.assertions(3);
        expect(axiosErrorConverterSpy).toBeCalledTimes(1);
        expect(axiosErrorConverterSpy).toHaveBeenCalledWith(errorObjet, logger);
        return expect(response).rejects.toEqual({});
    });
});
