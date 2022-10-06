import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import changeBlogService from "./services/newblog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user] = useState(
    JSON.parse(window.localStorage.getItem("blogAppUser"))
  );
  const [showNotification, setShowNotification] = useState(null);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.reload(true);
  };

  useEffect(() => {
    refreshAllBlogs();
  }, []);

  const handleNewBlog = async (title, url, author, event) => {
    event.preventDefault();
    await changeBlogService.newBlog({ title, url, author });
    await refreshAllBlogs();
    DisplayTemporaryNotification(`Blog titled ${title} created!`);
  };

  const handleLike = async (newBlog) => {
    const answer = await changeBlogService.updateBlog(newBlog);
    await refreshAllBlogs();
    return answer;
  };

  const refreshAllBlogs = async () => {
    let allBlogs = await blogService.getAll();
    allBlogs = allBlogs.sort((a, b) => {
      // sorts by likes
      if (a.likes < b.likes) {
        return 1;
      } else {
        return -1;
      }
    });
    setBlogs(allBlogs);
  };

  const DisplayTemporaryNotification = (message) => {
    setShowNotification(`${message}`);
    setTimeout(() => {
      setShowNotification(null);
    }, 5000);
  };

  if (user) {
    return (
      <>
        <>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              refreshAllBlogs={refreshAllBlogs}
              allowRemove={user.username === blog.user.username}
              handleLike={handleLike}
            />
          ))}
        </>
        <h3>New Blog Form</h3>
        <Toggleable buttonLabel={"New Blog Form"}>
          <NewBlog
            refreshAllBlogs={refreshAllBlogs}
            DisplayTemporaryNotification={DisplayTemporaryNotification}
            handleNewBlog={handleNewBlog}
          />
        </Toggleable>
        <Notification message={showNotification} />
        <>
          <h2>Logout</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      </>
    );
  } else {
    return (
      <Toggleable buttonLabel={"Show Login"}>
        <>
          <>
            <h1>Please, Log In!</h1>
            <LoginForm
              DisplayTemporaryNotification={DisplayTemporaryNotification}
            />
          </>

          <Notification message={showNotification} />
        </>
      </Toggleable>
    );
  }
};

export default App;
