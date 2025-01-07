import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];

  console.log(token)

  if (!token) {
    res.send("No token :(  ");
  } else {
    jwt.verify(token, "zone", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed Authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};
