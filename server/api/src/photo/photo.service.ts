import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier'
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PhotoService {
    uploadFile(file: Express.Multer.File) {
        return new Promise<string | UploadApiErrorResponse>((resolve, reject) => {
            const uniqueFilename = `${uuidv4()}.jpg`
            const uploadStream = cloudinary.uploader.upload_stream(
                {public_id: uniqueFilename},
              (error, result) => {
                if (error) return reject(error);
                resolve(result?.secure_url);
              },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        })
    }

    async deletePhotoByUrl(photoUrl: string): Promise<void> {
        const publicId = this.extractPublicId(photoUrl);
        if (!publicId) {
            throw new Error('Неможливо отримати public_id');
        }
        await cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                throw new Error(`Помилка при видаленні файлу`);
            }
        });
    }

    private extractPublicId(url: string): string | null {
        const regex = /cloudinary\.com\/.*\/image\/upload\/.*\/(.+)\./;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
}
