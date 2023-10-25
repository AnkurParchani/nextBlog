import mongoose from "mongoose";

import Blog from "./blogModel";
import User from "./userModel";

// Interface that defines the structure of seperate document
interface ILike {
  blog: object;
  user: object;
}

// Creating the schema
const likeSchema = new mongoose.Schema<ILike>({
  blog: { type: mongoose.Schema.ObjectId, ref: Blog },
  user: { type: mongoose.Schema.ObjectId, ref: User },
});

// Defining and exporting the model
const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;
