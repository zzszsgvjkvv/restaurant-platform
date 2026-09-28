import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

// 1. استيراد المكتبة عبر require وتفادي مشاكل الـ ES Modules تماماً أثناء التشغيل
const multerStorage = require('multer-storage-cloudinary');

// 2. فحص ديناميكي دقيق للوصول إلى الـ Constructor الفعلي لتجنب خطأ is not a constructor
const TargetStorageClass = multerStorage.CloudinaryStorage || multerStorage.default || multerStorage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

// 3. بناء كائن التخزين باستخدام الفئة التي تم التحقق منها
const storage = new TargetStorageClass({
  cloudinary: cloudinary,
  params: {
    folder: 'hiro_platform',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, crop: 'limit' }],
    public_id: (req: any, file: any) => {
      const cleanName = file.originalname.split('.')[0].replace(/\s+/g, '_');
      return `${Date.now()}-${cleanName}`;
    },
  },
});

export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // حد أقصى 5 ميجابايت للملف
});
