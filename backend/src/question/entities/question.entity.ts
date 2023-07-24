import { Answer } from 'src/answer/entities/answer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  title: string;

  @Column({default: ''})
  description: string;

  @Column({default: 0})
  rating: number;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfCreation: Date;

  @CreateDateColumn({ type: 'timestamp' })
  dateOfUpdate: Date;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[]
  
  @ManyToOne(() => User, (user) => user.questions)
  user: User

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[]
}
