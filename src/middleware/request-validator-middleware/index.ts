import * as ovm from 'openapi-validator-middleware';
import * as fs from 'fs';

const apiJson = JSON.parse(fs.readFileSync('./src/generated/service.openapi.json').toString());
ovm.init(apiJson);

export const requestValidatorMiddleware = [
    ovm.validate,
    (err, req, res, next) => {
        res.status(400).send(err);
    },
];
