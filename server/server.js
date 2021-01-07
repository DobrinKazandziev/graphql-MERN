import 'dotenv/config';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from "apollo-server-express";

import typeDefs from './graphql/types/index';
import resolvers from './graphql/resolvers/index';

import { authCheck } from './utils/auth';
import createFakeDB from './utils/fakeDataModule';

const { PORT, DB_ATLAS_URI, DB_LOCAL_URI } = process.env;

//  express server
const app = express();

//  db
const fakeDB = createFakeDB();
// const db = async () => {
//   try {
//     const dbConnectSuccess = await mongoose.connect(DB_LOCAL_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//   });

//     console.log('DB Connected');
//   } catch (error) {
//     console.log('DB Connection Error:', error);
//   }
// }

// //  execute database connection
// db();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    db: fakeDB,
  },
});

//  applyMiddleware method connects ApoolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpServer = http.createServer(app);

//  REST endpoint
app.get('/rest', authCheck, (req, res) => {
  res.json({ data: 'You hit rest endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
  console.log(`GraphQL Server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
