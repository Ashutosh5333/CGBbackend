import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";

interface IMessage {
  msgKey: string;
  message: string;
}

interface IUser extends Document {
  name: string;
  email: string;
  messages: IMessage[];
}

const MessageSchema = new Schema<IMessage>({
  msgKey: String,
  message: String,
});

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [50, "name can't exceed 50 characters"],
    minLength: [3, "name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  messages: [MessageSchema],
});

const UserModel = mongoose.model<IUser>("user", UserSchema);

export { UserModel, IUser };
