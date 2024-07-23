import mongoose from "mongoose";

const InformationSchema = new mongoose.Schema({
    whatsapp: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    alamat: { type: String, required: true }
}, { timestamps: true });

const Information = mongoose.model("Information", InformationSchema);
export default Information;
