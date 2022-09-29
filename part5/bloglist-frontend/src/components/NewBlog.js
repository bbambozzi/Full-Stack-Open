import { useState } from "react";
import newBlogService from "../services/newblog";

const NewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const notify = props.DisplayTemporaryNotification;
  const refreshBlogs = props.refreshAllBlogs;

  const handleNewBlog = (event) => {
    event.preventDefault();
    newBlogService.newBlog({ title, url, author });
    refreshBlogs();
    notify(`Blog titled ${title} created!`);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  return (
    <>
      <h2>Submit a new Blog!</h2>
      <form onSubmit={handleNewBlog}>
        <>
          <p>Title</p>
          <input onChange={handleTitleChange}></input>
        </>
        <>
          <p>Author</p>
          <input onChange={handleAuthorChange}></input>
        </>
        <>
          <p>URL</p>
          <input onChange={handleUrlChange}></input>
        </>
        <>
          <button type="submit">Submit</button>
        </>
      </form>
    </>
  );
};

export default NewBlog;
