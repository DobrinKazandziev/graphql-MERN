import { gql } from 'apollo-server-express';
import { authCheck } from '../../utils/auth';

module.exports = {
  Query: {
    user: (parent, args, { req, res, db }, info) => {
      authCheck(req, res);
      return 'Dobrin';
    },
  }
}
