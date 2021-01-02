import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
// import * as bcrypt from "bcryptjs";

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
  //   hashPassword() {
  //     this.password = bcrypt.hashSync(this.password, 8);
  //   }

  //   checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
  //     return bcrypt.compareSync(unencryptedPassword, this.password);
  //   }
}
