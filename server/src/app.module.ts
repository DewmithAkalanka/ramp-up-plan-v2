import { Module } from '@nestjs/common';
import { FileUploadModule } from './file-upload/file-upload.module';
import { DatabaseModule } from './database/database.module';
import { StudentModule } from './student/student.module';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [FileUploadModule, DatabaseModule, StudentModule],
  controllers: [],
  providers: [NotificationGateway],
})
export class AppModule {}
