require('dotenv').config()
const database = require('./database/database.js')
const graphql = require('./database/graphql.js')

// Connect to mongoDB with connection string in environment variables.
const models = database(process.env.mongoURI)
const server = graphql(models)

const dev = !(process.env.NODE_ENV === 'production')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '4000'
const domain = `${dev ? 'http' : 'https' }://${ host }:${ port }`

const options = {
  port,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

server.get('/', (req, res, next) => {
  res.json({
    message: 'This is the root directory of adawg\'s famous quotation API. In production, this route will redirect you to the front end for the project.',
    endpoint: `${ domain }/endpoint`,
    subscriptions: `${ domain }/subscriptions`,
    playground: `${ domain }/playground`,
  })
})

server.start(options, ({ port }) => {
  console.log(`GraphQL server is running on ${ domain }`)
})
