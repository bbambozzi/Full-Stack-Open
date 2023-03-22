import express from "express";
import { Sequelize } from "sequelize";
import Blog from "../models/Blog";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const groupedBlogs = await Blog.findAll({
      group: "author",
      attributes: [
        "author",
        [Sequelize.fn("sum", Sequelize.col("likes")), "totalLikes"],
        [Sequelize.fn("count", Sequelize.col("*")), "totalBlogs"],
      ],
      order: [["totalLikes", "DESC"]],
    });
    res.status(200).json(groupedBlogs);
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
