
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./types')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = function (models) {
  const pubsub = new PubSub()  
  const server = new GraphQLServer({
    schema,
    context: {
      models,
      pubsub
    } 
  })
  return server
}
