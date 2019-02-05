require("dotenv").config()
import { GraphQLServer, PubSub } from "graphql-yoga"

import schema from "./database/graphql.js"
import { models } from "./database/models"
import database from './database/database.js'

// Connect to mongoDB with connection string in environment variables.
const { mongoURI } = process.env
database(mongoURI)

const pubsub = new PubSub()
const options = {
  port: process.env.PORT || "4000",
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground"
}
const context = {
  models,
  pubsub
}
const server = new GraphQLServer({
  schema,
  context
})

server.start(options, ({ port }) => {
  console.log(`GraphQL server is running on http://localhost:${port}`)
})
