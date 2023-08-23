const { ApolloServer } = require('apollo-server-lambda');
const { resolvers } = require('./utils/resolvers.js');
const typeDefs = require('./utils/models/typeDefs'); 
const mongoose = require('mongoose');

const server = new ApolloServer({
  typeDefs, 
  resolvers
});

const pass = "jDhifHm3xdBcE7Qi";
const mongoDB = `mongodb+srv://midouinmakendy:${pass}@cluster0.05pe0za.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);

// Connect to MongoDB using the promise-based approach
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.info('📚 Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
  

const db = mongoose.connection;
db.once('open', () => {
  console.info('📚 Connected to db', db?.client?._connectionString);
});

const serverHandler = server.createHandler({
    cors: {
      origin: '*'
    }
  });
  
  exports.handler = (event, context, callback) => {
    return serverHandler(
      {
        ...event,
        requestContext: event.requestContext || {},
      },
      context,
      callback
    );
  };