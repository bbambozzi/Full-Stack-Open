const dummy = () => 1;

const totalLikes = (blogsArray) => {
  if (blogsArray.length === 0) { return 0 }
  const answer = blogsArray.reduce((accumulatedLikes, currentObject) => { return accumulatedLikes += currentObject.likes }, 0);
  return answer;
};

const favoriteBlog = (blogsArray) => {
  if (blogsArray === undefined || blogsArray.length === 0 || !blogsArray) { return null; }

  const answer = blogsArray.reduce((mostLiked, current) => {
    if (mostLiked.likes === undefined || mostLiked.likes <= current.likes) {
      mostLiked = { title: current.title, likes: current.likes, author: current.author };
    }
    return mostLiked;
  }, {});
  return answer;
};

const mostBlogs = blogsArray => {
  // implemented using a hashmap.
  const myMap = new Map();
  // this creates a hashmap of key: author and value: times seen in const myMap
  for (let blogObject of blogsArray) {
    if (!myMap.has(blogObject.author)) {
      myMap.set(blogObject.author, 1);
      continue
    }
    myMap.set(blogObject.author, myMap.get(blogObject.author) + 1);
  }
  // now we iterate the values of myMap to find the most common one.
  let answer = undefined;
  myMap.forEach((val, key) => {
    if (answer === undefined || answer.blogs < val) {
      const newAnswer = { author: key, blogs: val }
      answer = newAnswer;
    }
  })
  return answer;
}

const mostLikes = blogsArray => {
  // implemented using a HashMap
  const myMap = new Map()
  // Fill the hash map with likes
  for (let blogObject of blogsArray) {
    if (!myMap.has(blogObject.author)) {
      myMap.set(blogObject.author, blogObject.likes);
      continue;
    }
    myMap.set(blogObject.author, myMap.get(blogObject.author) + blogObject.likes)
  }
  // Check to see the author with most likes
  answer = undefined;
  myMap.forEach((val, key) => {
    if (answer === undefined || answer.likes < val) {
      answer = { author: key, likes: val }
    }
  })
  return answer;
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
