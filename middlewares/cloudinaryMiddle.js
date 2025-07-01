import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let resourceType = 'auto'; // Let Cloudinary detect automatically
    
    return {
      folder: 'uploads',
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
      format: async () => {
        const ext = file.originalname.split('.').pop().toLowerCase();
        return ext === 'pdf' ? 'pdf' : ext;
      }
    };
  }
});

const upload = multer({ storage });
export default upload;


