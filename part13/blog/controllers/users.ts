import express from "express";
import { Blog, User } from "../models/models";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: { model: Blog, attributes: ["title", "url"] },
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
  const user = await User.findByPk(req.params.id, {
    include: { model: Blog, attributes: ["title", "url"] },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  await user?.update(req.body);
  res.status(200).json(user);
});

export default router;
