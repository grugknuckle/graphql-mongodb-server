require('dotenv').config()
import database from './database/database.js'
import graphql from './database/graphql.js'

// Connect to mongoDB with connection string in environment variables.
const models = database(process.env.mongoURI)
const server = graphql(models)

const options = {
  port: process.env.PORT || '4000',
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

server.start(options, ({ port }) => {
  console.log(`GraphQL server is running on http://localhost:${port}`)
})
