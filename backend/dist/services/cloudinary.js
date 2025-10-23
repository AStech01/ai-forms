"use strict";
// import cloudinary from '../config/cloudinary';
// import { UploadApiResponse } from 'cloudinary';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
// export const uploadImage = async (file: Express.Multer.File): Promise => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         folder: 'form-uploads',
//         resource_type: 'auto',
//       },
//       (error, result: UploadApiResponse | undefined) => {
//         if (error) return reject(error);
//         if (!result) return reject(new Error('Upload failed'));
//         resolve(result.secure_url);
//       }
//     );
//     uploadStream.end(file.buffer);
//   });
// };
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
/**
 * Uploads an image file to Cloudinary and returns the secure URL.
 * @param file Multer file object (buffer based)
 * @returns Promise<string> - URL of the uploaded image
 */
const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder: 'form-uploads',
            resource_type: 'auto',
        }, (error, result) => {
            if (error) {
                console.error('Cloudinary upload error:', error);
                return reject(error);
            }
            if (!result) {
                return reject(new Error('Upload failed: No result returned.'));
            }
            resolve(result.secure_url);
        });
        uploadStream.end(file.buffer);
    });
};
exports.uploadImage = uploadImage;
