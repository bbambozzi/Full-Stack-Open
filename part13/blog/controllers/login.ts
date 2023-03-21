import jwt from "jsonwebtoken";
import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();
import { SECRET } from "../utils/config";
import User from "../models/User";

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username,
    },
  });
  const passwordCorrect = body.password === "examplepassword";

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }
  let newuser = user.toJSON();
  const userForToken = {
    username: newuser.username,
    id: newuser.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  response
    .status(200)
    .send({ token, username: newuser.username, name: newuser.name });
});

export default router;
