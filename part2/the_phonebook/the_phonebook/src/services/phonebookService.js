import axios from 'axios';
const getURL = `http://localhost:3001/persons`;


const getAll = () => {
  const request = axios.get(getURL)
  return request.then((response) => {
    return response.data;
  })
}

const add = (newObject) => {
  const request = axios.post(getURL, newObject)
  return request.then((response) => {
    return response.data;
  })
}

const update = (id, newObject) => {
  const request = axios.put(`${getURL}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  })
}

const remove = (id) => {
  const request = axios.delete(`${getURL}/${id}`);
  return request.then((response) => {
    return response.data;
  })
}

export default { getAll, add, update, remove }
