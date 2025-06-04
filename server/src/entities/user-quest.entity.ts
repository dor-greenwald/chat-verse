import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { DailyQuest } from './daily-quest.entity';

@Entity()
export class UserQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.quests)
  user: User;

  @ManyToOne(() => DailyQuest)
  quest: DailyQuest;

  @Column({ default: 0 })
  progress: number;

  @Column({ default: false })
  completed: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
