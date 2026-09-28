"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
});
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'hiro_platform',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, crop: 'limit' }],
        public_id: (req, file) => {
            // إزالة المسافات والامتداد من اسم الملف الأصلي لمنع أخطاء الروابط
            const cleanName = file.originalname.split('.')[0].replace(/\s+/g, '_');
            return `${Date.now()}-${cleanName}`;
        },
    }, // استخدام 'as any' هنا يحمي الإعدادات من تضارب حزم الأنواع (Types) المتغيرة لـ Cloudinary
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // حد أقصى 5 ميجابايت للملف
});
//# sourceMappingURL=upload.js.map