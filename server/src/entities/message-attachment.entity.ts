import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class MessageAttachment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Message, (message) => message.attachments)
  message: Message;

  @Column()
  fileUrl: string;

  @Column()
  fileType: string;

  @CreateDateColumn()
  uploadedAt: Date;
}
