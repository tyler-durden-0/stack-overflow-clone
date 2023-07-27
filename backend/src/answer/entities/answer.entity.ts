import { DislikeAnswer } from 'src/dislike-answer/entities/dislike-answer.entity';
import { LikeAnswer } from 'src/like-answer/entities/like-answer.entity';
import { Question } from 'src/question/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @OneToMany(() => LikeAnswer, (like) => like.answer)
  likes: LikeAnswer[];

  @OneToMany(() => DislikeAnswer, (like) => like.answer)
  dislikes: DislikeAnswer[];
}
