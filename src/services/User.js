import { getConnection } from "typeorm";
import Users from "../entity/Users";

class UserService {
  getByUsername({ username }) {
    return getConnection()
      .createQueryBuilder()
      .select("user")
      .from(Users, "user")
      .where("user.username = :username", { username })
      .getOne();
  }

  signup({ username, password }) {
    const user = new Users();
    user.username = username;
    user.password = password;

    user.hashPassword().then(() => user.save());
  }
}

export default new UserService();
