import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    file: { 
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        originalName: { type: String, required: true }
    },
    message: { type: String, required: true }
}, { timestamps: true });

const FileData = mongoose.model('Filing', fileSchema);
export default FileData;