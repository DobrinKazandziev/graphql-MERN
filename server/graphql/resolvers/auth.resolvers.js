import { gql } from 'apollo-server-express';
import { authCheck } from '../../utils/auth';

const currentUser = async (parent, args, { req }, info) => {
  await authCheck(req);
  return 'Dobrin';
};

module.exports = {
  Query: {
    currentUser
  }
}
