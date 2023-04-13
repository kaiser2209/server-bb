import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    require: true,
  },
  tag: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  rooms: [
    {
      id: { type: String },
    },
  ],
  createdAt: { type: String },
  updatedAt: { type: String },
  deletedAt: { type: String },
});

const itens = mongoose.model("itens", itemSchema);

export default itens;
