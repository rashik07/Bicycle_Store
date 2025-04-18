import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer';
import config from '../config';
import path from 'path';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage: storage });


// import multer from "multer"
// import path from "path"
// import fs from 'fs'
// import { v2 as cloudinary } from 'cloudinary';
// import { ICloudinaryResponse, IFile } from "../interface/files"


// cloudinary.config({
//     cloud_name: 'dbgrq28js',
//     api_key: '173484379744282',
//     api_secret: 'eHKsVTxIOLl5oaO_BHxBQWAK3GA'
// });

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), 'uploads'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({ storage: storage })

// export const sendImageToCloudinary = async (file: IFile): Promise<ICloudinaryResponse | undefined> => {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(file.path,
//             (error: Error, result: ICloudinaryResponse) => {
//                 fs.unlinkSync(file.path)
//                 if (error) {
//                     reject(error)
//                 }
//                 else {
//                     resolve(result)
//                 }
//             })
//     })
// };

