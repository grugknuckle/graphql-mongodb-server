
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './types'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default function (models) {
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
