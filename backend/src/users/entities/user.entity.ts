import { Answer } from 'src/answer/entities/answer.entity';
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
}
