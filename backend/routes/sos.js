import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import twilio from "twilio";
import SOS from "../models/SOS.js";
import Contact from "../models/Contact.js";
import User from "../models/User.js"; // Add this

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, "../.env") });

const router = express.Router();

// Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// POST /api/sos
router.post("/", async (req, res) => {
  try {
    const { userId, location } = req.body;

    if (!userId || !location) {
      return res
        .status(400)
        .json({ success: false, message: "UserId and location required" });
    }

    // Fetch user info
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch contacts
    const contacts = await Contact.find({ userId });
    if (!contacts.length) {
      return res
        .status(400)
        .json({ success: false, message: "No contacts found for this user" });
    }

    // Save SOS event
    const newSOS = new SOS({ userId, location, contacts });
    await newSOS.save();

    // Send SMS alerts
    const results = [];
    for (const contact of contacts) {
      try {
        const msg = await client.messages.create({
          body: `🚨 SOS Alert!\n${user.name} may be in danger.\n📍 Location: https://maps.google.com/?q=${location.lat},${location.lng}`,
          from: process.env.TWILIO_PHONE,
          to: contact.phone,
        });
        results.push({ contact: contact.phone, status: "sent", sid: msg.sid });
      } catch (err) {
        results.push({ contact: contact.phone, status: "failed", error: err.message });
      }
    }

    res.status(200).json({
      success: true,
      message: "SOS alert processed",
      results,
    });
  } catch (err) {
    console.error("SOS ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
