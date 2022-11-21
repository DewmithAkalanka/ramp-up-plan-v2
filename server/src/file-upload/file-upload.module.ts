/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class FileUploadModule {}
