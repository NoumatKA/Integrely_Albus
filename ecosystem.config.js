// eslint-disable-next-line no-undef
module.exports = {
    apps: [{
        name: 'BFF_API_CLIENT',
        script: './dist/index.js',
        env: {
            STAGE: 'dev',
            PORT: 3003,
            API_KEY: 'yPU^9L80PRi!',
            BFF_USER: 'bff-client',
            BFF_PASSWORD: 'tyuyurlcqcklg',
            API_URL: 'http://35.159.34.15:3000/api',
            API_PUBLIC_URL: 'http://35.159.34.15:3000',
        },
    }],
};
