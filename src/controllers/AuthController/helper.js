import jwt from "jsonwebtoken";
import { SECRET_KEYS } from "../../constants/keys";

const generateToken = (user) => {
  const data = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign({ data }, SECRET_KEYS, { expiresIn: "1h" });
};

const handleLogin = async (user, password) => {
  const unencryptedIsValid = await user.checkIfUnencryptedPasswordIsValid(
    password
  );

  if (!user || !unencryptedIsValid) {
    throw new Error("");
  }

  return generateToken(user);
};

export default { handleLogin };
