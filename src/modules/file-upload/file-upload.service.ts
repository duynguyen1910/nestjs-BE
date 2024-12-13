import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor() {}

  saveFilesInfo(files: Express.Multer.File[], baseUrl: string) {
    const fileUrls = files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      url: `/uploads/${file.filename}`,
    }));

    return fileUrls;
  }
}
