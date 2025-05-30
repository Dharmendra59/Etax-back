import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    file: { type: String, required: true },   // Cloudinary URL save hoga
    message: { type: String, required: true }
}, { timestamps: true });

const FileData = mongoose.model('Filing', fileSchema);
export default FileData;
