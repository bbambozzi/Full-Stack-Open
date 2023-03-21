import express from "express";
import { Response, NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../utils/config";
import { Blog, User } from "../models/models";
const app = express.Router();

interface RequestWithToken extends Request {
  decodedToken?: any;
}

const extractorMiddleware = (
  req: RequestWithToken,
  res: Response,
  next: NextFunction
) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    try {
      const decodedToken = jwt.verify(auth.substring(7), SECRET);
      if (typeof decodedToken == "string") {
        throw Error("Invalid token");
      }
      req.decodedToken = decodedToken;
      next();
    } catch (e) {
      res.status(401).json({ e });
    }
  } else {
    res.status(401).json({ e: "token is missing" });
    return;
  }
};

app.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"],
    },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  res.json(blogs);
});

app.post(
  "/",
  extractorMiddleware,
  async (req: RequestWithToken, res: Response) => {
    if (!req?.decodedToken?.id) {
      res.status(400).json({ e: "missing token" });
      return;
    }
    try {
      let foundUser = (await User.findByPk(req.decodedToken.id))?.toJSON();
      if (!foundUser) {
        res.status(404).json({ e: "user not found in db" });
        return;
      }
      const newBlog = Blog.create({ ...req.body, userId: foundUser.id });
      res.status(201).json(newBlog);
    } catch (e) {
      console.error(`Error ${e}`);
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
      attributes: ["name", "username"],
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
