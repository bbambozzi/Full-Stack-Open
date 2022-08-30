// Make an axios-type note services which handles URL requests and avoids bloat on main App.
import axios from 'axios';


const baseURL = `http://localhost:3001/notes`


const getAll = () => {
  const request = axios.get(baseURL)
  return request.then((response) => {
    return response.data;
  })

}

const create = (newObject) => {
  const request = axios.post(baseURL, newObject)
  return request.then((response) => response.data)
}

const update = (newObject) => {
  const request = axios.put(`${baseURL}/${newObject.id}`, newObject)
  return request.then((response) => {
    return response.data
  })
}


export default { getAll, create, update, }
