import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Sequelize, Model, DataTypes } from "sequelize";
const app = express();
const PORT = process.env.PORT || "3001";
const DATABASE_URL = process.env.DATABASE_URL || "fix";
app.use(express.json());

const sequelize = new Sequelize(DATABASE_URL);
class Blog extends Model {}

Blog.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
);
Blog.sync(); // creates table if it doesent exist

app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post("/api/blogs", async (req, res) => {
  try {
    const newBlog = Blog.build(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (e) {
    console.error(`Error ${e}`);
    res.status(400).json({ e });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) {
    res.status(200).json(blog);
    return;
  } else {
    res.sendStatus(404);
    return;
  }
});

app.delete("/api/blogs/:id", async (req, res) => {
  // code goes here
  const blog = await Blog.findByPk(req.params.id);
  await blog?.destroy();
  res.sendStatus(204).end();
  return;
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
