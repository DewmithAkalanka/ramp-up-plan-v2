/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  dob: Date;

  @Column()
  email: string;
}
