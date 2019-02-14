require('dotenv').config()
const database = require('./database/database.js')
const graphql = require('./database/graphql.js')

// Connect to mongoDB with connection string in environment variables.
const models = database(process.env.mongoURI)
const server = graphql(models)

// import config variables
const dev = !(process.env.MODE === 'production')
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || '4000'
const domain = dev ? `http://localhost:${ port }` : `https://${ host }`

const options = {
  port,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground'
}

// define home route as a standard REST endpoint.
// NOTE: Once a front end application is deployed, this endpoint should redirect to the home route of that app.
server.get('/', (req, res, next) => {
  res.json({
    message: 'This is the root directory of adawg\'s famous quotation API. In production, this route will redirect you to the front end for the project.',
    endpoint: `${ domain }/endpoint`,
    subscriptions: `${ domain }/subscriptions`,
    playground: `${ domain }/playground`,
  })
})


// Start the server.
server.start(options, ({ port }) => {
  console.log(`GraphQL server is running on ${ domain }`)
})

/*
  NOTES:
  The graphql-yoga library (which makes the server) is based on express.js. 

  GraphQLServer exposes the express.Application directly via its express property:

    server.express.use(myMiddleware())

  Middleware can also be added specifically to the GraphQL endpoint route, by using:

    server.express.post(server.options.endpoint, myMiddleware())
  
  Any middleware you add to that route, will be added right before the apollo-server-express middleware.
*/