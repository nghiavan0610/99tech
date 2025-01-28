# Express Product API

A RESTful API service for managing crypto products built with Express.js and TypeScript.

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
# You can use my certs to connect my database
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
docker build -t express-product-api .

# Run Docker container (Note: expose Port with same PORT in your .env.prod)
docker run -d -p ${PORT}:${PORT} --name express-product-api express-product-api

# Or you can use my docker-compose.yml file
docker-compose up -d
```

## Project Structure

```
src/
├── config/             # Configuration files
├── controllers/        # Route controllers
├── models/             # Database models
├── services/           # Business logic
├── shared/             # Shared utilities
│   ├── dtos/           # Shared DTO
│   ├── exceptions/     # Custom exceptions
│   ├── helpers/        # Helper functions
│   ├── interfaces/     # TypeScript interfaces
│   ├── middlewares/    # Express middlewares
│   └── modules/        # Shared modules
│   └── types/          # Shared types
├── app.ts              # Express app setup
└── server.ts           # Server entry point
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
- `yarn clean`: Clean build directory

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

This project is licensed under the MIT License - see the [LICENSE](../../express-crypto-api/LICENSE) file for details.
