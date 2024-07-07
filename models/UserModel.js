import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, default: 'user' }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
