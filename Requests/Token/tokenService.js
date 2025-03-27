import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./Requests/Token/secret.env" });

export const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};
