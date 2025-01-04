import { db } from "../database/db.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, password],
      (err, result) => {
        if (err) {
          res.status(400).json({ msg: "Error" });
        }

        res.status(200).json(result);
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
