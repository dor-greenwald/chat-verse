import { Module } from '@nestjs/common';
import { MessageReactionsController } from './message-reactions.controller';
import { MessageReactionsService } from './message-reactions.service';
import { MessageReaction } from 'src/entities/message-reaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MessageReaction])],
  controllers: [MessageReactionsController],
  providers: [MessageReactionsService],
})
export class MessageReactionsModule {}
