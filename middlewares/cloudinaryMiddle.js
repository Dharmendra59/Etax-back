import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'my_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
        resource_type: 'auto',   // सभी फाइल types सपोर्ट करें
    },
});

const upload = multer({ storage });
export default upload;
