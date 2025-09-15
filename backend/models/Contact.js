import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

export default mongoose.model("Contact", contactSchema);
