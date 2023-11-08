import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Interface that defines the structure of seperate docuement
interface IUser {
  name: string;
  email: { type: string; unique: boolean; message: string };
  password: string;
  passwordConfirm: string | undefined;
  img: string;
}

// Creating the schema
const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: {
    type: String,
    unique: [true, "This email has already been used by someone else"],
    message: "This email has already been used by someone else",
  },
  password: { type: String, select: false },
  passwordConfirm: String,
  img: String,
});

// Encrypting the password before saving it to DB
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Creating Index for emails
userSchema.index({ email: 1 }, { unique: true });

// Defining and exporting the model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
