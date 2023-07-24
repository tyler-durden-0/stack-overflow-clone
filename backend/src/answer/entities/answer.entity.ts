import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  text: string;

  @Column({default: 0})
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfUpdate: Date;

  @ManyToOne(() => User, (user) => user.answers)
  user: User

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question
}
