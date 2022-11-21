/* eslint-disable prettier/prettier */
import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/User.entity';
import { Job } from 'bull';

import { FileUploadService } from './file-upload.service';

@Processor('excel-file-upload-queue')
export class UploadProcessor {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private fileUploadService: FileUploadService,
  ) {}

  @Process('excel-file-upload')
  async uploadExcel(job: Job) {
    const { file } = job.data; // file is the uploaded file
    this.fileUploadService.saveFile(file); // save file to database
  }
}
