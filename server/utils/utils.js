import jwt from "jsonwebtoken";

export const generateAccessToken = ({ id, role }) => {
  return jwt.sign({ id, role }, "zone", { expiresIn: "10s" });
};
