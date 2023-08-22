const { ApolloServer } = require('apollo-server-lambda');
const { resolvers } = require('./resolvers');
const typeDefs = require('./utils/models/typeDefs'); // Import typeDefs directly
const mongoose = require('mongoose');

const server = new ApolloServer({
  typeDefs,       // Use imported typeDefs
  resolvers
});

const pass = "jDhifHm3xdBcE7Qi";
const mongoDB = `mongodb+srv://midouinmakendy:${pass}@cluster0.05pe0za.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set('strictQuery', true);
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.info('📚 Connected to db', db?.client?._connectionString);
});


const handler = server.createHandler();

module.exports = { handler };
