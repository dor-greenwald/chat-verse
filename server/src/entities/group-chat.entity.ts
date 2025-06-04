import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { GroupMember } from './group-member.entity';
import { Message } from './message.entity';

@Entity()
export class GroupChat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User)
  owner: User;

  @OneToMany(() => GroupMember, (member) => member.groupChat)
  members: GroupMember[];

  @OneToMany(() => Message, (message) => message.groupChat)
  messages: Message[];

  @CreateDateColumn()
  createdAt: Date;
}
