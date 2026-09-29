import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const multerStorage = require('multer-storage-cloudinary');
const TargetStorageClass = multerStorage.CloudinaryStorage || multerStorage.default || multerStorage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const storage = new TargetStorageClass({
  cloudinary: cloudinary,
  params: {
    folder: 'hiro_platform',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, crop: 'limit' }],
    // تم حذف دالة public_id المعقدة لمنع تعليق معالجة الملف مؤقتاً
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // حد أقصى 5 ميجابايت للملف لحماية السيرفر
});
