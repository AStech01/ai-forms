// import cloudinary from '../config/cloudinary';
// import { UploadApiResponse } from 'cloudinary';

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

import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

/**
 * Uploads an image file to Cloudinary and returns the secure URL.
 * @param file Multer file object (buffer based)
 * @returns Promise<string> - URL of the uploaded image
 */
export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'form-uploads',
        resource_type: 'auto',
      },
      (error, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Upload failed: No result returned.'));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(file.buffer);
  });
};
