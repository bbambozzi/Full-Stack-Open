import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || "3001";
import express from "express";
import { Sequelize, QueryTypes, Model, DataTypes } from "sequelize";
const sequelize = new Sequelize(process.env.DATABASE_URL || "");
const app = express();
app.use(express.json());
// includes both username and pwd in the url

class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);

const main = async () => {
  try {
    console.log("connection established");
    await sequelize.authenticate();
    const notes = await sequelize.query("SELECT * FROM notes", {
      type: QueryTypes.SELECT,
    });
    sequelize.close();
  } catch (e) {
    console.error(`Unable to connect: ${e}`);
  }
};

app.get("/api/notes", async (_, res) => {
  const notes = await Note.findAll();
  console.log(notes);
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  try {
    const newNote = Note.build(req.body);
    await newNote.save();
    res.json(newNote).end();
    return;
  } catch (e) {
    console.error(`Error : ${e}`);
    res.status(400).json({ e });
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
