# Crypto Statistics Worker Server

Background job server that triggers cryptocurrency data collection every 15 minutes.

## Features

- Scheduled job running every 15 minutes
- NATS event publishing
- Configurable through environment variables

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

- node-cron for scheduling
- NATS for message queue publishing
- Configurable job intervals

## Monitoring

The server logs:

- Job execution times
- Successful event publications
- Any errors that occur

## Testing

Manual trigger endpoint (development only):

```bash
curl -X POST http://localhost:3001/trigger
```
