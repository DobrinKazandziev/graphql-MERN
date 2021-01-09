import 'dotenv/config';
import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';

import typeDefs from './graphql/types/index';
import resolvers from './graphql/resolvers/index';

import { authCkeckMiddleware } from './utils/auth';
import createFakeDB from './utils/fakeDataModule';

const { PORT, DB_ATLAS_URI, DB_LOCAL_URI } = process.env;

//  express server
const app = express();
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());

//  db
const fakeDB = createFakeDB();
const db = async () => {
  try {
    const dbConnectSuccess = await mongoose.connect(DB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
  });

    console.log('DB Connected');
  } catch (error) {
    console.log('DB Connection Error:', error);
  }
}

//  execute database connection
db();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => (
    {
      req,
      res,
      db: fakeDB,
    }
  ),
});

//  applyMiddleware method connects ApoolloServer to a specific HTTP framework ie: express
apolloServer.applyMiddleware({ app });

// server
const httpServer = http.createServer(app);

//  cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  REST endpoint
app.get('/rest', authCkeckMiddleware, (req, res) => {
  res.json({ data: 'You hit rest endpoint' });
});

app.post('/upload-images', authCkeckMiddleware, (req,res) => {
  cloudinary.uploader.upload(req.body.image, (result) => {
    // console.log('result', result.iri)
    res.send({
      url: result.url,
      public_id: result.public_id
    });
  },
  {
    public_id: `${Date.now()}`, // public name
    resource_type: 'auto',  //  JPEG,PNG
  })
  .then((cb) => cb())
});

//  remove image
app.post('/remove-image', authCkeckMiddleware,(req,res) => {
  let image_id = req.body.public_id;
  
  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.send('ok');
  });
});

app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
  console.log(`GraphQL Server is ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
});
