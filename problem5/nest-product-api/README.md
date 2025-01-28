<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for building a product API.

## Prerequisites

- Node.js (v20+)
- Yarn
- MongoDB
- MinIO (for file storage)

## Environment Setup

1. Copy the environment file:

```bash
cp .env.example .env
```

2. Update the following environment variables in the `.env` file:

```bash
# MongoDB Configuration
MONGODB_URL=your_mongodb_url
MONGODB_NAME=your_db_name
MONGODB_AUTH=admin
# Note: If you use NODE_ENV=prod, you need to provide the configuration below, otherwise it is not needed
# You can use my certs to connect my database (certs folder)
MONGODB_REPLICA_SET=your_replica_set
MONGODB_CA_PATH=your_CA_path
MONGODB_CERT_PATH=your_client_cert_path

# MinIO Configuration
# You can use my minIO to connect my Object Storage
MIN_IO_ACCESS_KEY=your_minio_access_key
MIN_IO_SECRET_KEY=your_minio_secret_key
MIN_IO_REGION=your_region
MIN_IO_ENDPOINT=your_minio_endpoint
MIN_IO_BUCKET=your_bucket_name
MIN_IO_CDN=your_CDN
```

## Installation

```bash
# Install dependencies
yarn install
```

## Running the App

```bash
# Development mode
yarn run start

# Watch mode
yarn run dev

# Build the project
yarn run build

# Production mode
yarn run start:prod
```

## Docker

```bash
# Build Docker image
# Note: If you want to build Docker image, please clone your .env to .env.prod
docker build -t nest-product-api .

# Run Docker container (Note: expose Port with same PORT in your .env.prod)
docker run -d -p ${PORT}:${PORT} --name nest-product-api nest-product-api

# Or you can use my docker-compose.yml file
docker-compose up -d
```

## Project Structure

```
src/
├── config/             # Configuration files
├── shared/             # Shared utilities
│   ├── decorators/     # Custom decorators
│   ├── dtos/           # Shared DTO
│   ├── exceptions/     # Custom exceptions
│   ├── filters/        # Catch all exceptions
│   ├── helpers/        # Helper functions
│   ├── interfaces/     # TypeScript interfaces
│   ├── middlewares/    # Express middlewares
│   └── modules/        # Shared modules
│   └── pipes/          # Custom pipes
│   └── types/          # Shared types
├── app.module.ts       # Main application module
└── main.ts             # Application entry point
└── seed.ts             # Seeder entry point
```

## API Endpoints

### Health Check

```
GET /api/v1/health
```

### Products

```
GET    /api/v1/products       # List products
POST   /api/v1/products       # Create product
GET    /api/v1/products/:id   # Get product
PUT    /api/v1/products/:id   # Update product
DELETE /api/v1/products/:id   # Delete product
```

### File Upload

```
POST /api/v1/uploads/image    # Upload image
```

## Features

- TypeScript support
- MongoDB integration
- MinIO file storage
- Request validation
- Error handling
- Rate limiting
- CORS enabled
- API documentation
- Docker support
- Environment configuration
- Logging system

## Scripts

- `yarn dev`: Run in development mode
- `yarn build`: Build the project
- `yarn start:prod`: Run in production mode
- `yarn lint`: Run linter
- `yarn test`: Run tests

## Security

- Helmet for security headers
- Rate limiting
- File validation
- CORS configuration
- Error sanitization

## Logging

Logs are stored in the `logs` directory with the following levels:

- Error
- Warning
- Info
- Debug

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
