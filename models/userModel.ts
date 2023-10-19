import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Interface that defines the structure of seperate docuement
interface IUser {
  name: string;
  email: { type: string; unique: boolean; message: string };
  password: string;
  passwordConfirm: string | undefined;
}

// Creating the schema
const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: {
    type: String,
    unique: true,
    message: "This email has already been used by someone else",
  },
  password: String,
  passwordConfirm: String,
});

// Encrypting the password before saving it to DB
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

// Defining and exporting the model
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
