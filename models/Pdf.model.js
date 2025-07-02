import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  mobile: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Pdf = mongoose.model('Pdf', pdfSchema);

export default Pdf;
