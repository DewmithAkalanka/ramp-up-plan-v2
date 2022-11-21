import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadService } from './file-upload.service';

@Controller('/api/file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Get('/')
  getHello(): string {
    return this.fileUploadService.getHelloFromFileUpload();
  }

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
  uploadExcelFile(@UploadedFile() file) {
    this.fileUploadService.saveFile(file);
  }
}
