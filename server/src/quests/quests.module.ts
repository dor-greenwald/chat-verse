import { Module } from '@nestjs/common';
import { QuestsController } from './quests.controller';
import { QuestsService } from './quests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserQuest } from 'src/entities/user-quest.entity';
import { DailyQuest } from 'src/entities/daily-quest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserQuest, DailyQuest])],
  controllers: [QuestsController],
  providers: [QuestsService],
})
export class QuestsModule {}
