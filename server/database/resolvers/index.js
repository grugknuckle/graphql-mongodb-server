const { mergeResolvers } = require('merge-graphql-schemas')
const Quote = require('./Quote')

const resolvers = [ Quote ]

module.exports = mergeResolvers(resolvers)
