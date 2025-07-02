import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    message: { type: String, required: true }
}, { timestamps: true });

const FileData = mongoose.model('Filing', fileSchema);
export default FileData;