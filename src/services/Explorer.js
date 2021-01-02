import { getConnection } from "typeorm";
import Explorer from "../entity/Explorer";

class ExplorerService {
  getAll() {
    return getConnection().query("select * from explorer");
  }

  save({ id, name, type, parent }) {
    const content = new Explorer();
    content.id = id;
    content.name = name;
    content.type = type;
    content.parent = parent;
    return content.save();
  }

  delete(id) {
    return getConnection()
      .createQueryBuilder()
      .delete()
      .from(Explorer)
      .where("id = :id", { id })
      .execute();
  }

  update({ id, name, type, parent }) {
    return getConnection()
      .createQueryBuilder()
      .update(Explorer)
      .set({ name, type, parent })
      .where("id = :id", { id })
      .execute();
  }
}

export default new ExplorerService();
