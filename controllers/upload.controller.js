import Pdf from '../models/Pdf.model.js';

export const uploadPdf = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { name, mobile, email, message } = req.body;

  if (!name || !mobile || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, mobile, email, message) are required.' });
  }

  const file = new Pdf({
    name,
    mobile,
    email,
    message,
    fileName: req.file.filename,
    filePath: `/uploads/${req.file.filename}`,
  });

  try {
    const savedFile = await file.save();
    res.status(201).json({
      message: 'File and data uploaded successfully!',
      fileUrl: `http://localhost:3000${savedFile.filePath}`,
      fileData: savedFile,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save file metadata in DB' });
  }
};
