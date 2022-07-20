## Description
This README is a boilerplate provided by Albus, the BFF (Business Functions Framework) tool that helps you to develop lean microservices with the API first approach. You should replace this description with a similar one, reflecting your service description.

## Environment Requirements

Check the environment setup required in BFF user docs section [Environment Setup](https://docs.services.vwfs.io/content/enter-the-bff-ts-node-api-gen/environment-setup.html).

## Build & Start

This section is meant to be enhanced if you add some preconditions to build and start your service.

If you see this README, you already:
- provisioned an OpenAPI 3.0 specification file in the root folder of your service
- ran the `albus generate` command that led you here. 

Following the API first approach, paths and data models specified will be part of the generated service. 

You are ready to implement your service business logic. Read more in our user-docs section [Adding your business logic](https://docs.services.vwfs.io/content/enter-the-bff-ts-node-api-gen/part-4-business-logic.html).

## Locally w/ Node

To start the server:
* run `yarn && yarn start` if you have a .env file with all your environment variables
* run `yarn && ENV_VAR=bar yarn start` if you don't have a .env file

The server will be listening on the default url `localhost:8080`.

You can check the health of the service in your browser under http://localhost:8080/<your_service_name>/health

To comply to BFF Standards, the following endpoints are available, besides of the health check:

- http://localhost:8080/<your_service_name>/portal/api
- http://localhost:8080/<your_service_name>/portal/manual
- http://localhost:8080/<your_service_name>/portal/changelog
- http://localhost:8080/<your_service_name>/portal/risklog
- http://localhost:8080/<your_service_name>/portal/config

# Further Development
Here you should explain how to extend your service, either in the business logic or adding a new endpoint.
To add a new endpoint, follow the API first approach, then:
- first refer to your service OpenAPI specification file
- run the `albus generate` command again, to reflect the changes in your service

> It's a good practice not to manually change whatever is under the `generated/` folder. Those files will be overwritten with the `albus generate` command. 

## Further Available Scripts

* Run linting: `yarn lint`
* Format files: `yarn format`
* Create an OSS-license-report from the dependencies: `yarn license:report`

## Tests Development
You should explain in this section where unit tests and api tests for your service are placed and how to run them. 
Albus does not provide any scaffold for you, but BFF does have a structured guide to help you get the most out of our tools, at the user docs section [Testing](https://docs.services.vwfs.io/content/enter-the-bff-ts-node-api-gen/part-5-testing.html).

## Technical Diagram

Here the technical architectural overview diagram of your service should come. 

# Contact
Please insert a technical contact and a business contact for your service here.