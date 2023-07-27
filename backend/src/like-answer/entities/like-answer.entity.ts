import { Answer } from "src/answer/entities/answer.entity";
import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikeAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likesOnAnswers)
  user: User;

  @ManyToOne(() => Answer, (answer) => answer.likes)
  answer: Answer;
}
