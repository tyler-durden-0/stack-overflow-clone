import { Question } from 'src/question/entity/question.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  text: string;

  @CreateDateColumn()
  dateOfCreation: Date;

  @CreateDateColumn()
  dateOfUpdate: Date;

  @ManyToOne(() => User, (user) => user.answers)
  user: User

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question
}
