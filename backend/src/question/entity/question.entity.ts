import { Answer } from 'src/answer/entity/answer.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column({default: ''})
  desription: string;

  @Column({default: 0})
  rating: number;

  @Column('text', {array: true})
  tags: string[];

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfUpdate: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]

  @ManyToOne(() => User, (user) => user.questions)
  user: User
}
