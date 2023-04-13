import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  antenna: [
    {
      id: { type: String },
    },
  ],
  createdAt: { type: String },
  updatedAt: { type: String },
  deletedAt: { type: String },
});

const rooms = mongoose.model("rooms", roomSchema);

export default rooms;
