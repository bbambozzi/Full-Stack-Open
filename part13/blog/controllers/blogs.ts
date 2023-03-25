import express from "express";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import { blogQueryParser } from "./helpers/queryParsers";
import { SECRET } from "../utils/config";
import { Blog, User } from "../models/models";
import {
  extractorMiddleware,
  RequestWithToken,
} from "./helpers/extractorMiddleware";
const app = express.Router();

app.get("/", async (req, res) => {
  const where = blogQueryParser(req.query) as any;
  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(blogs);
});

app.post(
  "/",
  extractorMiddleware,
  async (req: RequestWithToken, res: Response) => {
    if (!req.decodedToken.id) {
      res.status(400).json({ e: "missing token" });
      return;
    }
    try {
      let foundUser = (await User.findByPk(req.decodedToken.id))?.toJSON();
      if (!foundUser) {
        res.status(404).json({ e: "user not found in db" });
        return;
      }
      const newBlog = await Blog.create({
        ...req.body,
        userId: foundUser.id,
      });
      res.status(201).json(newBlog);
    } catch (e) {
      res.status(400).json({ e });
    }
  }
);

app.get("/:id", async (req: RequestWithToken, res: Response) => {
  const blog = await Blog.findByPk(req.params.id, {
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: User,
      attributes: ["username"],
    },
  });
  if (blog) {
    res.status(200).json(blog);
    return;
  } else {
    res.sendStatus(404);
    return;
  }
});

app.delete(
  "/:id",
  extractorMiddleware,
  async (req: RequestWithToken, res: Response) => {
    const blog = await Blog.findByPk(req.params.id);
    await blog?.destroy();
    res.sendStatus(204).end();
    return;
  }
);

app.put(
  "/:id",
  extractorMiddleware,
  async (req: RequestWithToken, res: Response) => {
    if (!req.body || !req.decodedToken) {
      res.status(400).json({ e: "missing body or token" });
      return;
    }
    try {
      const currentBlog = await Blog.findByPk(req.params.id);
      if (!currentBlog) {
        res.sendStatus(404).end();
        return;
      }
      await currentBlog?.update(req.body);
      res.status(201).json(currentBlog);
    } catch (e) {
      res.status(400).json({ e });
      return;
    }
  }
);

export default app;
