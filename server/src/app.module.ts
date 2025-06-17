import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MessageModule } from './message/message.module';
import { GroupChatController } from './group-chat/group-chat.controller';
import { GroupChatService } from './group-chat/group-chat.service';
import { GroupChatModule } from './group-chat/group-chat.module';
import { GroupMembersModule } from './group-members/group-members.module';
import { MessageReactionsModule } from './message-reactions/message-reactions.module';
import { MessageAttachmentsModule } from './message-attachments/message-attachments.module';
import { FriendModule } from './friend/friend.module';
import { AchievementsModule } from './achievements/achievements.module';
import { QuestsModule } from './quests/quests.module';
import { createChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'z10mz10m',
      database: 'chat_verse',
      autoLoadEntities: true,
    }),
    UserModule,
    MessageModule,
    GroupChatModule,
    GroupMembersModule,
    MessageReactionsModule,
    MessageAttachmentsModule,
    FriendModule,
    AchievementsModule,
    QuestsModule,
  ],
  controllers: [AppController, GroupChatController],
  providers: [AppService, GroupChatService, createChatGateway()],
})
export class AppModule {}
