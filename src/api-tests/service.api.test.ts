import * as request from 'supertest';

const endpointURL =
    process.env.STAGE === 'local'
        ? 'http://localhost:8080/BFF_Client_API'
        : `https://api.${process.env.AWS_REGION}.${process.env.STAGE}.services.vwfs.io/BFF_Client_API`;

const headers = {
    'content-type': 'application/json',
    accept: 'application/json',
    'x-api-key': process.env.API_KEY,
    ...(process.env.STAGE === 'local' ? { 'x-consumer-id': '1234' } : {}),
};

describe('get /triggerJob', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/triggerJob?jobName=undefined&jobType=undefined')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });

    test('HAPPY PATH: A result should return 201 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/triggerJob?jobName=undefined&jobType=undefined')
            .set(headers)
            .expect(201)
            .then((res) => {
                // Please provide a valid response example for 201 response
            });
    });

    test('UNHAPPY PATH: A result should return 404 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/triggerJob?jobName=undefined&jobType=undefined')
            .set(headers)
            .expect(404)
            .then((res) => {
                // Please replace with an assertion that evaluates a 404 response
                // Please provide a valid response example for 404 response
            });
    });
});

describe('get /getAllObjects/{tenantId}', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/getAllObjects/undefined')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});

describe('get /getObjectFields/{tenantId}/{objectName}', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/getObjectFields/undefined/undefined')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});

describe('post /createEndpoint', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .post('/createEndpoint')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});

describe('post /createSFConnection', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .post('/createSFConnection')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});

describe('get /getSFObjectChanges/{tenantId}', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/getSFObjectChanges/undefined')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});

describe('get /data/{endpointName}', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .get('/data/undefined')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});

describe('post /addTemplate', () => {
    test('HAPPY PATH: A result should return 200 response code and match the expected object', async () => {
        await request(endpointURL)
            .post('/addTemplate')
            .set(headers)
            .expect(200)
            .then((res) => {
                // Please provide a valid response example for 200 response
            });
    });
});
