import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// 📌 Add new contact
router.post("/", async (req, res) => {
  try {
    const { userId, name, phone, status } = req.body;
    const newContact = new Contact({ userId, name, phone, status });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get all contacts for a user
router.get("/:userId", async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.params.userId });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Update a contact
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
