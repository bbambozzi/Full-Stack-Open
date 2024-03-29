import express from "express";
import { PORT } from "./utils/config";
import blogsRouter from "./controllers/blogs";
import usersRouter from "./controllers/users";
import loginRouter from "./controllers/login";
import authorsRouter from "./controllers/authors";
import readingListRouter from "./controllers/readingList";
const app = express();

app.use(express.json());
app.use("/api/blogs/", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists/", readingListRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
