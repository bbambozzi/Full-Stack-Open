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

export default { newBlog };
