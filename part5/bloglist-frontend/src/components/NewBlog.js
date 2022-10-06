import React, { useState } from "react";
import PropTypes from "prop-types";

const NewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleNewBlog = props.handleNewBlog;

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
      <form
        data-testid="entireForm"
        onSubmit={(event) => handleNewBlog(title, url, author, event)}
      >
        <>
          <p>Title</p>
          <input onChange={handleTitleChange} data-testid="titleInput"></input>
        </>
        <>
          <p>Author</p>
          <input
            onChange={handleAuthorChange}
            data-testid="authorInput"
          ></input>
        </>
        <>
          <p>URL</p>
          <input onChange={handleUrlChange} data-testid="urlInput"></input>
        </>
        <>
          <button type="submit">Submit</button>
        </>
      </form>
    </>
  );
};

NewBlog.propTypes = {
  DisplayTemporaryNotification: PropTypes.func,
  handleNewBlog: PropTypes.func.isRequired,
};

export default NewBlog;
