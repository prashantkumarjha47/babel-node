import jwt from "jsonwebtoken";
import { SECRET_KEYS } from "../constants/keys";

export const authCheck = (req, res, next) => {
  const { token } = req.headers;

  try {
    const decoded = jwt.verify(token, SECRET_KEYS);
    next();
  } catch (err) {
    res.status(403).send({ message: "Unauthorized" });
  }
};
