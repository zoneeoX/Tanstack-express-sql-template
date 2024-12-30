import mysql from "mysql";
import { database, host, password, username } from "../configs/db.config.js";

export const db = mysql.createConnection({
  host: host,
  user: username,
  password: password,
  database: database,
});

db.connect();

export const testDBConnection = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
      if (err) return reject(err);
      resolve(rows[0].solution);
    });
  });
};

process.on("exit", () => db.end());
