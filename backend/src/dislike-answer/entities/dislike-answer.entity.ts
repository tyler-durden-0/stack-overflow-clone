import { Answer } from "src/answer/entities/answer.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DislikeAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.dislikesOnAnswers)
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.dislikes)
  answer: Answer;
}
