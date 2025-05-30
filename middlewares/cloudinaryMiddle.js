import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'uploads',
      resource_type: 'auto', // ⭐ Supports images, pdfs, excels, etc.
      public_id: file.originalname.split('.')[0],
    };
  },
});

const upload = multer({ storage });
export default upload;
