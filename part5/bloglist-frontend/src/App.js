import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";

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
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [blogs]);

  const refreshAllBlogs = async () => {
    const allBlogs = await blogService.getAll();
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
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
        <>
          <NewBlog
            refreshAllBlogs={refreshAllBlogs}
            DisplayTemporaryNotification={DisplayTemporaryNotification}
          />
        </>
        <Notification message={showNotification} />
        <>
          <h2>Logout</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      </>
    );
  } else {
    return (
      <>
        <>
          <h1>Please, Log In!</h1>
          <LoginForm
            DisplayTemporaryNotification={DisplayTemporaryNotification}
          />
        </>

        <Notification message={showNotification} />
      </>
    );
  }
};

export default App;
