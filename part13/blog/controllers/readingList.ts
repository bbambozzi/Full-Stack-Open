import express, { Request, Response } from "express";
import { User, Blog } from "../models/models";
import { Op } from "sequelize";
import { ReadingListEntry } from "../models/models";
import {
  extractorMiddleware,
  RequestWithToken,
} from "./helpers/extractorMiddleware";
import {} from "./helpers/queryParsers";
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(
    await ReadingListEntry.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "name"],
        },
        {
          model: Blog,
          attributes: ["title", "likes"],
        },
      ],
    })
  );
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const readingList = await ReadingListEntry.findAll({
      where: {
        blogId: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "name"],
        },
        {
          model: Blog,
          attributes: ["title", "likes"],
        },
      ],
    });
    if (!readingList) {
      res.status(404).json({ e: "not found" });
      return;
    }
    res.status(200).json(readingList);
  } catch (e) {
    console.log(e);
    res.status(400).json({ e });
  }
});

router.put("/:id", async (req, res) => {
  if (typeof req.body.read !== "boolean") {
    res.status(400).json({ e: "no 'read' property in JSON body" });
    return;
  }
  try {
    const entry = await ReadingListEntry.findByPk(req.params.id);
    if (!entry) {
      res.status(404).json({ e: "not found" });
      return;
    }
    await entry.update({ read: req.body.read });
    res.json(entry);
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.post(
  "/",
  extractorMiddleware,
  async (req: RequestWithToken, res: Response) => {
    if (
      typeof req.body.userId !== "string" ||
      typeof req.body.blogId !== "string"
    ) {
      res
        .status(400)
        .json({ e: "Malformed request body. Include blogId and userId" });
      return;
    }
    try {
      let userReadingList = ReadingListEntry.build(req.body);
      await userReadingList.save();
      res.status(200).json(userReadingList);
    } catch (e) {
      res.status(400).json({ e });
    }
  }
);

export default router;
