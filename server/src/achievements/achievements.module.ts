import { Module } from '@nestjs/common';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from 'src/entities/achievement.entity';
import { UserAchievement } from 'src/entities/user-achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement, UserAchievement])],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}
