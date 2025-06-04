import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class DailyQuest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column()
  xpReward: number;

  @Column()
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
