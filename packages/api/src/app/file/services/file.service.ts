import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3 } from '@aws-sdk/client-s3';

@Injectable()
export class FileService {
  constructor(private configService: ConfigService) {}

  async uploadFile(folder: string, file: Express.Multer.File): Promise<string> {
    const s3Config = this.configService.get('s3');
    const s3Client = new S3({
      endpoint: s3Config.baseUrl,
      region: s3Config.region,
      credentials: {
        accessKeyId: s3Config.accessKeyId,
        secretAccessKey: s3Config.secretAccessKey,
      },
      forcePathStyle: true,
    });

    const key = `${Date.now().toString()}_${file.originalname}`;

    const uploadParams = {
      Bucket: s3Config.bucket,
      Key: key,
      Body: file.buffer,
    };

    const command = new PutObjectCommand(uploadParams);

    await s3Client.send(command);

    return `${process.env.S3_BASE_URL}/${process.env.S3_BUCKET}/${key}`;
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
