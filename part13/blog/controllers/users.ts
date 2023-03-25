import express from "express";
import { Op } from "sequelize";
import { Blog, ReadingListEntry, User } from "../models/models";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        through: { attributes: [] }, // here we place the attributes of the common readingTableEntries
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] }, // exclude readingListEntry from Blog
      },
      {
        model: ReadingListEntry,
      },
    ],
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  let where: {} = {};
  if (req.query.read === "true" || req.query.read === "false") {
    where = { read: { [Op.eq]: Boolean(req.query.read) } };
  }

  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Blog,
        through: { attributes: [] },
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      },
      {
        model: ReadingListEntry,
        where,
      },
    ],
  });

  res.json(user);
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  await user?.update(req.body);
  res.status(200).json(user);
});

export default router;
