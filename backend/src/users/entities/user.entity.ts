import { Answer } from 'src/answer/entities/answer.entity';
import { LikeAnswer } from 'src/like-answer/entities/like-answer.entity';
import { LikeQuestion } from 'src/like-question/entities/like-question.entity';
import { Question } from 'src/question/entities/question.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  isAdmin: boolean;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[]

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]

  @OneToMany(() => LikeQuestion, (like) => like.user)
  likesOnQuestions: LikeQuestion[];

  @OneToMany(() => LikeAnswer, (like) => like.user)
  likesOnAnswers: LikeAnswer[];
}
