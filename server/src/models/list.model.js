import { model, Schema } from "mongoose";

const listSchema = new Schema(
  {
    title: { type: String, required: true, default: "New List 🆕" },
    position: { type: Number, required: true, default: 0 },
    boardId: { ref: "Board", type: Schema.Types.ObjectId },
    userId: { ref: "User", type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const listModel = model("List", listSchema);

export default listModel
