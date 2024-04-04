
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';


export const multerOptions: MulterOptions = {
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.jpg$/)) {
            return callback(new Error('Можливо завантажувати файли тільки jpg'), false);
        }
        callback(null, true);
    },
    limits: {
        fileSize: 3 * 1024 * 1024, 
    },
};