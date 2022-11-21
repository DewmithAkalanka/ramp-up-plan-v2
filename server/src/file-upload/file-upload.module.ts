/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { User } from 'src/entities/User.entity';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { UploadProcessor } from './upload.processor';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService, UploadProcessor],
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'excel-file-upload-queue',
    }),
  ],
})
export class FileUploadModule {}
