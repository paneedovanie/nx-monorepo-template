import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cloudinary, { UploadApiResponse } from 'cloudinary';
import streamifier from 'streamifier';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  async uploadFile(
    folder: string,
    fileBuffer: Buffer
  ): Promise<UploadApiResponse> {
    const cloudinaryConfig = this.configService.get('cloudinary');

    cloudinary.v2.config(cloudinaryConfig);

    return new Promise((res, rej) => {
      try {
        const cld_upload_stream = cloudinary.v2.uploader.upload_stream(
          { folder },
          function (error, result) {
            if (error) {
              rej(error);
            }
            res(result);
          }
        );

        streamifier.createReadStream(fileBuffer).pipe(cld_upload_stream);
      } catch (err) {
        rej(err);
      }
    });
  }

  //   async getFile(bucketName: string, fileKey: string): Promise<Buffer> {
  //     const response = await this.awsConfig.s3
  //       .getObject({
  //         Bucket: bucketName,
  //         Key: fileKey,
  //       })
  //       .promise();

  //     return response.Body as Buffer;
  //   }

  //   async deleteFile(bucketName: string, fileKey: string): Promise<void> {
  //     await this.awsConfig.s3
  //       .deleteObject({
  //         Bucket: bucketName,
  //         Key: fileKey,
  //       })
  //       .promise();
  //   }
}
