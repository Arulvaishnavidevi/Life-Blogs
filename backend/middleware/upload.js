import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'life-blogs',
        resource_type: 'auto',
        allowed_formats: ['jpeg', 'jpg', 'png', 'gif', 'webp', 'pdf', 'mp4', 'mp3', 'doc', 'docx'],
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: fileFilter
});
