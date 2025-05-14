import {connect} from "nats";
import {storeCryptoStats} from "../services/cryptoService.js";

export async function startNatsListener() {
  try {
    const nc = await connect({servers: process.env.NATS_URL});
    console.log("Connected to NATS server");

    // Subscribe to crypto update events
    const sub = nc.subscribe("crypto.update");
    console.log("Subscribed to crypto.update events");

    // Process received messages
    for await (const msg of sub) {
      console.log("Received update event:", msg.data.toString());
      try {
        await storeCryptoStats();
        console.log("Successfully updated crypto stats");
      } catch (error) {
        console.error("Error updating crypto stats:", error);
      }
    }
  } catch (error) {
    console.error("NATS connection error:", error);
    // Attempt to reconnect after delay
    setTimeout(startNatsListener, 5000);
  }
}
