import { gql } from 'apollo-server-express';
import { authCheck } from '../../utils/auth';

//  Queries
const totalPosts = async (parent, args, { req, db }, info) => {
  await authCheck(req);
  return db.posts.length;
};
const allPosts = async (parent, args, { req, db }, info) => {
  await authCheck(req);
  return db.posts;
};

//  Mutations
const createPost = async (parent, { data }, { req, db }, info) => {
  await authCheck(req);
  const newPost = { id: db.posts.length, ...data };
  db.posts.push(newPost);

  return newPost;
}

module.exports = {
  Query: {
    totalPosts,
    allPosts,
  },
  Mutation: {
    createPost,
  },
}
