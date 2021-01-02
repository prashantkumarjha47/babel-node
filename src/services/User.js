import { getConnection } from "typeorm";
import User from "../entity/Users";

class UserService {
  login({ username, password }) {
    return getConnection()
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.username = :username", { username })
      .andWhere("user.password = :password", { password })
      .getOne();
  }
}

export default new UserService();
