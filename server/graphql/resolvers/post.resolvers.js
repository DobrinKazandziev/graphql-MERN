import { authCheck } from '../../utils/auth';
import { DateTimeResolver }  from 'graphql-scalars';

import User from '../../models/user';
import Post from '../../models/post';

//  Queries
const allPosts = async (parent, args, ctx, info) => {
  return await Post.find({}).exec();
};

const postsByUser = async (parent, args, { req }, info) => {
  const currentUser = await authCheck(req);
  const currentUserFromDB = await User.findOne({ email: currentUser.email });

  return await Post.find({ postedBy: currentUserFromDB })
    .populate('postedBy', '_id email userName fullName')
    .sort({ createdAt: -1 });
};

//  Mutations
const createPost = async (parent, { data }, { req }, info) => {
  const currentUser = await authCheck(req);
  const currentUserFromDB = await User.findOne({ email: currentUser.email });
  
  if (data.content.trim() === '') {
    throw new Error('Content is required!');
  }

  let newPost = await new Post({ ...data, postedBy: currentUserFromDB._id }).save()
  .then((post) => post.populate('postedBy', '_id email fullName userName').execPopulate());

  return newPost;
}

module.exports = {
  Query: {
    allPosts,
    postsByUser,
  },
  Mutation: {
    createPost,
  },
}
