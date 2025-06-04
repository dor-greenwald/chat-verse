import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { GroupChat } from './group-chat.entity';

@Entity()
export class GroupMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => GroupChat, (groupChat) => groupChat.members)
  groupChat: GroupChat;

  @Column({ type: 'enum', enum: ['member', 'admin'], default: 'member' })
  role: 'member' | 'admin';

  @CreateDateColumn()
  joinedAt: Date;
}
