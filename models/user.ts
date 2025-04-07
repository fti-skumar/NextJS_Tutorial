import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const User = models.User || mongoose.model<IUser>("User", UserSchema);
