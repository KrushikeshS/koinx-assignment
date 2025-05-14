import {connect} from "nats";
import cron from "node-cron";
import dotenv from "dotenv";

dotenv.config();

const NATS_URL = process.env.NATS_URL;

async function publishUpdateEvent() {
  try {
    const nc = await connect({servers: NATS_URL});
    console.log("Connected to NATS server");

    // Publish the update event
    await nc.publish("crypto.update", JSON.stringify({trigger: "update"}));
    console.log("Published update event");

    // Close NATS connection
    await nc.close();
  } catch (error) {
    console.error("Error publishing event:", error);
  }
}

// Schedule job to run every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  console.log("Running scheduled task:", new Date().toISOString());
  await publishUpdateEvent();
});

console.log("Worker server started");
console.log("Scheduled task will run every 15 minutes");
