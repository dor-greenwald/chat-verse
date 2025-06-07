import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupChat } from 'src/entities/group-chat.entity';
import { GroupChatService } from './group-chat.service';
import { GroupChatController } from './group-chat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GroupChat])],
  providers: [GroupChatService],
  controllers: [GroupChatController],
})
export class GroupChatModule {}
