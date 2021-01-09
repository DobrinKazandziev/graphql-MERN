import { authCheck } from '../../utils/auth';
import { DateTimeResolver }  from 'graphql-scalars';

import User from '../../models/user';

//  Queries
const profile = async (parent, args, { req }, info) => {
  const currentUser = await authCheck(req);
  const profile = await User.findOne({ email: currentUser.email }).exec();

  return profile;
};

//  Mutations
const userCreate = async (parent, args, { req }, info) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email });
  return user ? user : new User({ 
    email: currentUser.email,
    // userName: created by default in models/User with nanoid
  }).save();
}

const userUpdate = async (parent, { input }, { req }, info) => {
  const currentUser = await authCheck(req);
  const updatedUser = await User.findOneAndUpdate(
    { email: currentUser.email }, 
    { ...input }, 
    { new: true },
  ).exec();
  return updatedUser;
}

module.exports = {
  Query: {
    profile
  },
  Mutation: {
    userCreate,
    userUpdate,
  },
}
