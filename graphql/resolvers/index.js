import { mergeResolvers } from 'merge-graphql-schemas'

import Quote from './Quote'

const resolvers = [ Quote ]

export default mergeResolvers(resolvers)
