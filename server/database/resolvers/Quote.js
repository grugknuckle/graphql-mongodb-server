
const Quote = require('./../models/Quote')

module.exports = {
  Query: {
    quote: async (parent, { _id }, context, info) => {
        return await Quote.findOne({ _id }).exec()
    },
    quotes: async (parent, { query, options }, context, info) => {
      console.log('Querying: ', query, options)
      let q = parseQuery(query)
      return Quote.paginate(q, options)
        .then(result => {
          let docs = result.docs.map(quote => ({
            _id: quote._id.toString(),
            body: quote.body,
            author: quote.author,
            source: quote.source,
            tags: quote.tags,
            votes: quote.votes
          }))
          return {
            docs,
            total: result.totalDocs,
            limit: result.limit,
            offset: result.offset
          }
        })
    },
    randomQuote: async (parent, { query }, context, info) => { 
      let q = parseQuery(query)
      // count how many records are in the collection
      let count = await Quote.countDocuments(q).exec()
      // make a random integer between 0 and count -1
      let random = Math.floor(Math.random() * count)
      // console.log('query: ', q, 'count: ', count, 'random: ', random)
      // Query the quote collection again, but only fetch one record offset by our random intger
      return await Quote.findOne(q).skip(random).exec()
    },
  },
  Mutation: {
    createQuote: async (parent, { quote }, context, info) => {
      const newQuote = await new Quote({
        body: quote.body,
        author: quote.author,
        source: quote.source,
        tags: quote.tags
      })

      return new Promise((resolve, reject) => {
        newQuote.save((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    },
    updateQuote: async (parent, { _id, quote }, context, info) => {
      return new Promise((resolve, reject) => {
        Quote.findByIdAndUpdate(_id, { $set: { ...quote } }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res)
          }
        )
      })
    },
    deleteQuote: (parent, { _id }, context, info) => {
      return new Promise((resolve, reject) => {
        Quote.findByIdAndDelete(_id).exec((err, res) => {
          err ? reject(err) : resolve(res)
        })
      })
    }
  },
  Subscription: {
    quote: {
      subscribe: (parent, args, { pubsub }) => {
        //return pubsub.asyncIterator(channel)
      }
    }
  }
}

function parseQuery(query) {
  let q = {}
  if (query.author) {
    q.author = new RegExp(query.author, 'i')
  }
  if (query.source) {
    q.source = new RegExp(query.source, 'i')
  }
  if (query.tags) {
    q.tags = new RegExp(query.tags, 'i')
  }
  return q
}