import faker from 'faker';

const NUM_USERS = 3;
const NUM_POSTS = 2;
const NUM_COMMENTS = 10;

const randomNumArbitrary = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

const createFakeUser = (idx) => {
  const firstName = faker.name.firstName();
  return {
    id: idx.toString(),
    name: firstName,
    email: faker.internet.email(firstName),
    age: faker.random.boolean() ? faker.random.number(100) : null,
  };
};

const createFakePost = (idx) => {
  return {
    id: idx.toString(),
    title: faker.lorem.sentence(),
    description: faker.lorem.text(),
    // published: faker.random.boolean(),
    // author: randomNumArbitrary(0, NUM_USERS-1),
  };
};

const createFakeComment = (idx) => {
  return {
    id: idx.toString(),
    text: faker.lorem.text(),
    author: randomNumArbitrary(0, NUM_USERS-1),
    post: randomNumArbitrary(0, NUM_POSTS-1),
  };
};

const createFakeUsers = () => [...Array(NUM_USERS).fill(null).map((val, idx) => createFakeUser(idx))];
const createFakePosts = () => [...Array(NUM_POSTS).fill(null).map((val, idx) => createFakePost(idx))];
const createFakeComments = () => [...Array(NUM_COMMENTS).fill(null).map((val, idx) => createFakeComment(idx))];

const createFakeDB = () => {
  return {
    // users: createFakeUsers(),
    posts: createFakePosts(),
    // comments: createFakeComments(),
  }
};

export { 
  createFakeDB as default,
  createFakePosts,
 }
