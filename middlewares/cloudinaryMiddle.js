import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
  params: async (req, file) => {
    let resourceType = 'image'; // default
    const mime = file.mimetype;

    if (mime === 'application/pdf' || mime.startsWith('application/')) {
      resourceType = 'raw';
    } else if (mime.startsWith('video/')) {
      resourceType = 'video';
    } else if (mime.startsWith('image/')) {
      resourceType = 'image';
    }

    return {
      folder: 'uploads',
      resource_type: resourceType,
      public_id: file.originalname,  // 🔥 Ye extension ke saath naam dega
    };
  },
});

const upload = multer({ storage });
export default upload;


