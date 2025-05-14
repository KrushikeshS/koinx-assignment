# Cryptocurrency Statistics System

A distributed system consisting of two Node.js servers that collect and serve cryptocurrency statistics using the CoinGecko API.

## System Architecture

- **API Server**: Handles HTTP requests and stores cryptocurrency data.
- **Worker Server**: Runs background jobs to trigger data collection.
- **NATS**: Message queue for inter-service communication.
- **MongoDB**: Database for storing cryptocurrency statistics.

## Setup Instructions

### Prerequisites

- Node.js v16+
- MongoDB (Make sure it's running and accessible)
- NATS Server (Make sure it's running and accessible)

### Installation

1. **Install and Start NATS Server:**

   ```bash
   # On macOS (using Homebrew)
   brew install nats-server
   nats-server
   ```

   For other operating systems, please refer to the official NATS documentation: https://nats.io/download/

2. **Set up API Server:**

   ```bash
   cd api-server
   npm install
   cp .env.example .env
   # Now, open the .env file and configure your environment variables,
   # such as the MongoDB connection URI and NATS server address.
   npm start
   ```

3. **Set up Worker Server:**
   ```bash
   cd worker-server
   npm install
   cp .env.example .env
   # Now, open the .env file and configure your environment variables,
   # such as the MongoDB connection URI, NATS server address, and
   # any API keys for CoinGecko if required in the future.
   npm start
   ```

## Directory Structure

```
/
├── api-server/         # Main API Server
│   ├── routes/       # API route handlers
│   ├── services/     # Business logic
│   ├── models/       # Database models
│   └── nats/         # NATS communication
│
└── worker-server/    # Background Worker Server
    └── src/          # Worker source code
```

## Features

- **Real-time Cryptocurrency Statistics**: Provides up-to-date information on various cryptocurrencies.
- **Price Deviation Calculations**: Implements logic to calculate and track price changes.
- **Automated Data Collection**: Configured to fetch and update cryptocurrency data automatically every 15 minutes.
- **Event-Driven Architecture**: Utilizes NATS for efficient and decoupled communication between services.
