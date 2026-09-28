import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary'; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'hiro_platform',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [{ width: 1000, crop: 'limit' }],
    public_id: (req: any, file: any) => {
      // إزالة المسافات والامتداد من اسم الملف الأصلي لمنع أخطاء الروابط
      const cleanName = file.originalname.split('.')[0].replace(/\s+/g, '_');
      return `${Date.now()}-${cleanName}`;
    },
  } as any, // استخدام 'as any' هنا يحمي الإعدادات من تضارب حزم الأنواع (Types) المتغيرة لـ Cloudinary
});

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // حد أقصى 5 ميجابايت للملف
});
