// const multer = require('multer');
import multer from 'multer';

// const { CloudinaryStorage } = require('multer-storage-cloudinary');
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// const cloudinary = require('../utils/cloudinary');
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'mern_uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'],
  },
});

const upload = multer({ storage: storage });

// module.exports = upload;
export default upload;