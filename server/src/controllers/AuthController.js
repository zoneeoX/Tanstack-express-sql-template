import { db } from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const salt = 10;

// export const register = async (req, res) => {
//   const { username, password } = req.body;

//   bcrypt.hash(password, salt, (err, hash) => {
//     if (err) {
//       console.log(err);
//     }

//     try {
//       db.query(
//         "INSERT INTO users (username, password) VALUES (?,?)",
//         [username, hash],
//         (err, result) => {
//           if (err) {
//             res.status(400).json({ msg: "Error" });
//           }

//           res.status(200).json(result);
//         }
//       );
//     } catch (error) {
//       res.status(404).json(error);
//     }
//   });
// };

// @ REFACTORED BETTER VERSION :D
export const register = async (req, res) => {
  const { username, password, role } = req.body;

  // CHECK DATA
  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
    // HASH PASSWORD WITH SALT
    const hash = await bcrypt.hash(password, salt);
    //SEPERATE QUERY UNTUK DB.QUERY
    const query =
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    //RESULT DENGAN PROMISE
    const result = await new Promise((resolve, reject) => {
      db.query(query, [username, hash, role], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.status(201).json({ msg: "User registered successfully", result });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// export const login = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     db.query(
//       "SELECT * from users WHERE username=?",
//       [username],
//       (err, result) => {
//         if (result.length > 0) {
//           bcrypt.compare(password, result[0].password, (error, response) => {
//             if (response) {
//               res.status(200).json({ msg: "Success" });
//             } else {
//               res.status(400).json({ msg: "Credentials not Matched", error });
//             }
//           });
//         }
//       }
//     );
//   } catch (error) {
//     res.status(400).json({ msg: "Invalid Credentials" });
//   }
// };

// @ REFACTORED BETTER VERSION :D

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username and password are required" });
  }

  try {
    const query = "SELECT * FROM users WHERE username = ?";
    const users = await new Promise((resolve, reject) => {
      db.query(query, [username], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    if (users.length === 0) {
      return res.json({ auth: false, message: "Wrong credential 🤔" });
    }

    const user = users[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const id = user.id;
      const role = user.role;
      const token = jwt.sign({ id, role }, "zone", { expiresIn: 300 });

      req.session.user = user;

      res.json({ auth: true, token: token, users: { id, username, role } });
    } else {
      res.json({ auth: false, message: "No Users Exists" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// export const login = async (req, res) => {
//   const { username, password, role } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ msg: "Username and password are required" });
//   }

//   try {
//     const query = "SELECT * FROM users WHERE username = ?";
//     const users = await new Promise((resolve, reject) => {
//       db.query(query, [username], (err, result) => {
//         if (err) return reject(err);
//         resolve(result);
//       });
//     });

//     if (users.length === 0) {
//       return res.json({ auth: false, message: "Wrong credential 🤔" });
//     }

//     const user = users[0];
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (isPasswordMatch) {
//       const id = user.id;
//       // SECRET KEYNYA MASUKIN .ENV INI CONTOH DOANG
//       const token = jwt.sign({ id, role: user.role }, "zone", {
//         expiresIn: 300,
//       });

//       req.session.user = user;

//       res.json({ auth: true, token: token, users: user });
//     } else {
//       res.json({ auth: false, message: "No Users Exists" });
//     }
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ msg: "Internal server error" });
//   }
// };

export const getUser = async (req, res) => {
  if (req.session.user || req.session.userId) {
    console.log(req.session.user || req.session.userId);
    res.send({ loggedIn: true, user: req.session.user || req.session.userId });
  } else {
    res.send({ loggedIn: false });
  }
};

export const isAuth = async (req, res, next) => {
  res.send("Authenticated :D");
};

export const amIAdmin = async (req, res, next) => {
  res.send("Yes you are an admin");
};

export const amIManager = async (req, res, next) => {
  res.send("Yes you are a manager");
};
