import { Module } from '@nestjs/common';
import { MessageAttachmentsController } from './message-attachments.controller';
import { MessageAttachmentsService } from './message-attachments.service';
import { MessageAttachment } from 'src/entities/message-attachment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageAttachment])],
  controllers: [MessageAttachmentsController],
  providers: [MessageAttachmentsService],
})
export class MessageAttachmentsModule {}
