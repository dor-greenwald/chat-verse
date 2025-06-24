import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Message } from './message.entity';
import { Friend } from './friend.entity';
import { UserAchievement } from './user-achievement.entity';
import { UserQuest } from './user-quest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: 1 })
  level: number;

  @Column({ default: 0 })
  xp: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Friend, (friend) => friend.user)
  friends: Friend[];

  @OneToMany(() => UserAchievement, (ua) => ua.user)
  achievements: UserAchievement[];

  @OneToMany(() => UserQuest, (uq) => uq.user)
  quests: UserQuest[];
}
