# Crypto Statistics API Server

REST API server that provides cryptocurrency statistics including current prices, market caps, and price deviations.

## API Endpoints

### GET /stats

Get latest cryptocurrency statistics

**Query Parameters:**

- `coin`: (Required) One of: "bitcoin", "ethereum", "matic-network"

**Response:**

```json
{
  "price": 40000,
  "marketCap": 800000000,
  "24hChange": 3.4
}
```

### GET /deviation

Get price standard deviation for last 100 records

**Query Parameters:**

- `coin`: (Required) One of: "bitcoin", "ethereum", "matic-network"

**Response:**

```json
{
  "deviation": 4082.48
}
```

### POST /trigger-collection

Manually trigger stats collection (for testing)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
NATS_URL=nats://localhost:4222
```

3. Start the server:

```bash
# Production
npm start
# Development with auto-reload
npm run dev
```

## Architecture

- Express.js for REST API
- MongoDB for data storage
- NATS for message queue communication
- CoinGecko API for cryptocurrency data

## Error Handling

- Invalid coin parameters return 400
- Missing data returns 404
- Server errors return 500
