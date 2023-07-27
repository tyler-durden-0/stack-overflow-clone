import { Question } from "src/question/entities/question.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class DislikeQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dislikesOnQuestions)
  user: User;

  @ManyToOne(() => Question, (question) => question.dislikes)
  question: Question;
}