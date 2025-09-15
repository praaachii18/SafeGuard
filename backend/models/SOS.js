import mongoose from "mongoose";

const sosSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  contacts: [
    {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("SOS", sosSchema);
