const manyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

const dummy = () => 1;

const totalLikes = (blogsArray) => {
  const answer = blogsArray.reduce((accumulatedLikes, currentObject) => accumulatedLikes += currentObject.likes, 0);
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
    console.log(`key ${key}  ${val}`)
    if (answer === undefined || answer.blogs < val) {
      console.log(`hey val is ${val}`)
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
