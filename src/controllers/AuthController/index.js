import express from "express";
import UserService from "../../services/User";
import AuthHelper from "./helper";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "Username or password missing" });
    return;
  }

  try {
    const user = await UserService.getByUsername({ username });
    const token = await AuthHelper.handleLogin(user, password);
    res.send({ message: "Login Success", token });
  } catch ({ message }) {
    res.status(400).send({ message: "Login Fail" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: "Username or password missing" });
    return;
  }

  try {
    await UserService.signup({ username, password });
    res.send({ message: "Signup Success" });
  } catch ({ message }) {
    res.status(400).send({ message: "Signup Fail" });
  }
});

export default router;
