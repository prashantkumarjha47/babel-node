import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column("varchar")
  username = "";

  @Column("text")
  password = "";

  @Column("date")
  @CreateDateColumn()
  createdAt = new Date();

  @Column("date")
  @UpdateDateColumn()
  updatedAt = new Date();

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); //salt is by default 10
  }

  async checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
    return await bcrypt.compare(unencryptedPassword, this.password);
  }
}
