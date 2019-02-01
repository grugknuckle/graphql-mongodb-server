import { mergeResolvers } from 'merge-graphql-schemas'

// import User from './User'
// import Post from './Post'
// import Comment from './Comment'
import Quote from './Quote'

const resolvers = [ Quote ]

export default mergeResolvers(resolvers)
