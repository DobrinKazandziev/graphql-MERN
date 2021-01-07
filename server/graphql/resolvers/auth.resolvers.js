import { gql } from 'apollo-server-express';
import { authCheck } from '../../utils/auth';

const user = async (parent, args, { req, db }, info) => {
  await authCheck(req);
  return 'Dobrin';
};

module.exports = {
  Query: {
    user
  }
}
