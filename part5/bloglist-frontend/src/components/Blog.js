import Toggleable from "./Toggleable";
import noteService from "../services/newblog";
import PropTypes from "prop-types";
import React from "react";

const deleteButtonStyle = {
  color: "lightred",
};

const style = {
  padding: 3,
  border: "solid",
  marginBottom: 10,
  borderRadius: 3,
};

const handleRemove = async (newBlog, refreshFn) => {
  const userChoice = window.confirm(
    `Are you sure you wish to delete ${newBlog.title}?`
  );
  if (userChoice) {
    await noteService.removeBlog(newBlog);
    await refreshFn();
    return true;
  }
};

const Blog = ({ blog, handleLike, allowRemove, refreshAllBlogs }) => {
  return (
    <div style={style} data-testid="blogDivContainer">
      {blog.title} by {blog.author}{" "}
      {
        <Toggleable buttonLabel={"show"}>
          title: {blog.title}
          <br />
          author: {blog.author}
          <br />
          likes: {blog.likes}{" "}
          <button
            onClick={() => handleLike({ ...blog, likes: blog.likes + 1 })}
          >
            Like!
          </button>
          <br />
          url: {blog.url}
          <br />
          {allowRemove ? (
            <button
              style={deleteButtonStyle}
              onClick={async () => handleRemove(blog, refreshAllBlogs)}
            >
              Remove
            </button>
          ) : null}
        </Toggleable>
      }
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  refreshAllBlogs: PropTypes.func.isRequired,
  allowRemove: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
