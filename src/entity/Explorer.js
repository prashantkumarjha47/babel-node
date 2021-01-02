import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinTable,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export default class Explorer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  name = "";

  @Column("varchar")
  type = "";

  @ManyToOne((type) => Explorer, { onDelete: "CASCADE" })
  parent = undefined;

  @Column("date")
  @CreateDateColumn()
  createdAt = new Date();

  @Column("date")
  @UpdateDateColumn()
  updatedAt = new Date();
}
