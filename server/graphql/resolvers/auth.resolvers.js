import { authCheck } from '../../utils/auth';

import User from '../../models/user';

//  Queries
const currentUser = async (parent, args, { req }, info) => {
  const currentUser = await authCheck(req);

  return currentUser.email;
};

//  Mutations
const userCreate = async (parent,args, { req }, info) => {
  const currentUser = await authCheck(req);
  const user = await User.findOne({ email: currentUser.email });
  return user ? user : new User({ 
    email: currentUser.email,
    // userName: created by default in models/User with nanoid
  }).save();
}

module.exports = {
  Query: {
    currentUser
  },
  Mutation: {
    userCreate
  }
}
