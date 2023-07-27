import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class LikeQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likesOnQuestions)
  user: User;

  @ManyToOne(() => Question, (question) => question.likes)
  question: Question;
}