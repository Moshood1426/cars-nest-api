import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carType: string;
}
