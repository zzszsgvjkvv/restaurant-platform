"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multerStorage = require('multer-storage-cloudinary');
const TargetStorageClass = multerStorage.CloudinaryStorage || multerStorage.default || multerStorage;
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.CLOUDINARY_API_SECRET || '',
});
const storage = new TargetStorageClass({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'hiro_platform',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1000, crop: 'limit' }],
        // تم حذف دالة public_id المعقدة لمنع تعليق معالجة الملف مؤقتاً
    },
});
exports.upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // حد أقصى 5 ميجابايت للملف لحماية السيرفر
});
//# sourceMappingURL=upload.js.map