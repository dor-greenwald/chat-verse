import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity()
@Unique(['message', 'user', 'emoji'])
export class MessageReaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Message, (message) => message.reactions)
  message: Message;

  @ManyToOne(() => User)
  user: User;

  @Column()
  emoji: string;

  @CreateDateColumn()
  reactedAt: Date;
}
