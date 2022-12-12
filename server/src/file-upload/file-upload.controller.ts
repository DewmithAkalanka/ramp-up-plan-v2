import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { FileUploadService } from './file-upload.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('/api/file-upload')
export class FileUploadController {
  // constructor(private readonly fileUploadService: FileUploadService) {}
  constructor(
    @InjectQueue('excel-file-upload-queue') private fileQueue: Queue,
  ) {}

  @Post('/')
  @UseInterceptors(
    FileInterceptor('excel', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileName = file.originalname;
          cb(null, fileName);
        },
      }),
    }),
  )
  async uploadExcelFile(@UploadedFile() file) {
    this.fileQueue.add('excel-file-upload', {
      file: file,
    });
    return {
      message: 'File uploaded successfully',
    };
  }
}
