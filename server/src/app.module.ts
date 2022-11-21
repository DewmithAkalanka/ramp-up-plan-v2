import { Module } from '@nestjs/common';
import { FileUploadModule } from './file-upload/file-upload.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [FileUploadModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
