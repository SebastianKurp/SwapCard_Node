import { ApolloServer } from 'apollo-server';
import {  makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { merge } from 'lodash';
import { MONGODB_URI } from './settings';
import { taskResolvers, taskTypeDefs } from './common/tasks/tasks.schema';

//To read the .env files
require('dotenv').config();

//connects to the mlab noSQL DB
mongoose.connect(
  MONGODB_URI,{ useNewUrlParser: true }
);

const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs, taskTypeDefs],
  resolvers: merge(taskResolvers),
});

//Create the server which we will send our GraphQL queries to.

const server = new ApolloServer({
  schema,
  formatError(error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(error);
    }
    return error;
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`MONGODB_URI ${MONGODB_URI}`);
});