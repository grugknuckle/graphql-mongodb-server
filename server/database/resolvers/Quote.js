
const Quote = require('./../models/Quote')

module.exports = {
  Query: {
    quote: async (parent, { _id }, context, info) => {
      if (_id) {
        // return the record with the passed id
        return await Quote.findOne({ _id }).exec()
      } else {
        // count how many quote records are in the DB
        return Quote.count().exec((err, count) => {
          // make a random integer
          let random = Math.floor(Math.random() * count)
          // Again, query all quotes, but only fetch one offset by our random intger
          return Quote.findOne().skip(random).exec()
        })
      }
      
    },
    quotes: async (parent, { query, options }, context, info) => {
      console.log('Querying: ', query, options)
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
    }
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
