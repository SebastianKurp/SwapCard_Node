import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { MONGODB_URI } from './settings';

/**
 * Connect to the mongodb database using the mongoose library.
 */
require('dotenv').config(); //To read the .env files

mongoose.connect(
  MONGODB_URI,{ useNewUrlParser: true }
);

/**
 * We must define a root type so that our server knows where to
 * look when we query the server i.e. in the "root" types.
 */
const rootTypeDefs = `
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

/**
 * Declare the schema which the will hold our GraphQL types and
 * resolvers.
 */
const schema = makeExecutableSchema({
  typeDefs: [rootTypeDefs],
});

/**
 * Create the server which we will send our GraphQL queries to.
 */
const server = new ApolloServer({
  schema,
  formatError(error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // logging the errors can help in development
      console.log(error);
    }
    return error;
  },
});

/**
 * Turn the server on by listening to a port.
 * Defaults to: http://localhost:4000
 */
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`MONGODB_URI ${MONGODB_URI}`);
});