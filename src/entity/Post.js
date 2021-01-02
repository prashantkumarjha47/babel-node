import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  title = "";

  @Column("text")
  text = "";
}
