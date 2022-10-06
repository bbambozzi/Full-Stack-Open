// handles creation of a new note
import axios from "axios";
const axiosURL = `/api/blogs`;

const newBlog = async ({ title, author, url }) => {
  const config = {
    headers: {
      Authorization: `bearer ${
        JSON.parse(window.localStorage.getItem("blogAppUser")).token
      }`,
    },
  };
  const newObject = { title, author, url };
  const response = await axios.post(axiosURL, newObject, config);
  return response.data;
};

const updateBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${
        JSON.parse(window.localStorage.getItem("blogAppUser")).token
      }`,
    },
  };
  const response = await axios.put(
    `${axiosURL}/${newBlog.id}`,
    newBlog,
    config
  );
  return response.data;
};

const removeBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: `bearer ${
        JSON.parse(window.localStorage.getItem("blogAppUser")).token
      }`,
    },
  };
  await axios.delete(`${axiosURL}/${newBlog.id}`, config);
  return true;
};

export default { newBlog, updateBlog, removeBlog };
