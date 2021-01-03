import express from "express";
import ExplorerService from "../../services/Explorer";
import { authCheck } from "../../middlewares/Auth";

const router = express.Router();

router.get("/", authCheck, async (req, res) => {
  const contents = await ExplorerService.getAll();
  res.send(contents);
});

const validatePostData = (name, type) => {
  if (!name || !type) throw new Error("Name or Type is missing");
};

router.post("/", async (req, res) => {
  const { name, type, parent } = req.body;

  try {
    validatePostData(name, type);
    await ExplorerService.save({ name, type, parent });
    res.send({ message: "Saved Successfully" });
  } catch ({ message }) {
    res.status(400).send({ message: "Unable to Insert" });
  }
});

router.put("/", async (req, res) => {
  const { id, name, type, parent } = req.body;

  if (id) {
    try {
      validatePostData(name, type);
      await ExplorerService.update({ id, name, type, parent });
      res.send({ message: "Update Success" });
    } catch (error) {
      res.status(400).send({ message: "Update Unsuccess" });
    }
  } else {
    res.status(400).send({ message: "ID missing" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      await ExplorerService.delete(id);
      res.send({ message: "Deleted Succefully" });
    } catch (error) {
      res.status(400).send({ message: "Deletion Unsuccessful" });
    }
  } else {
    res.status(400).send({ message: "ID missing" });
  }
});

export default router;
