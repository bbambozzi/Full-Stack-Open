import axios from 'axios';
const getURL = `/api/persons`;


const getAll = () => {
  const request = axios.get(getURL)
  return request.then((response) => {
    return response.data;
  })
}

const add = (newObject) => {
  const postingURL = `${getURL}/0`
  const request = axios.post(postingURL, newObject)
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
