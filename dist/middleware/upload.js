"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
// 1. استيراد المكتبة عبر require وتفادي مشاكل الـ ES Modules تماماً أثناء التشغيل
const multerStorage = require('multer-storage-cloudinary');
// 2. فحص ديناميكي دقيق للوصول إلى الـ Constructor الفعلي لتجنب خطأ is not a constructor
const TargetStorageClass = multerStorage.CloudinaryStorage || multerStorage.default || multerStorage;
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
});
// 3. بناء كائن التخزين باستخدام الفئة التي تم التحقق منها
const storage = new TargetStorageClass({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'hiro_platform',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, crop: 'limit' }],
        public_id: (req, file) => {
            const cleanName = file.originalname.split('.')[0].replace(/\s+/g, '_');
            return `${Date.now()}-${cleanName}`;
        },
    },
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // حد أقصى 5 ميجابايت للملف
});
//# sourceMappingURL=upload.js.map