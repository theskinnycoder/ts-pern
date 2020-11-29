import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ToDo' })
export default class ToDo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id!: string;

  @Column('text', { nullable: false })
  text!: string;

  @Column({ default: false })
  isCompleted!: boolean;
}
