
import Quote from "../../server/models/Quote"

export default {
  Query: {
    quote: async (parent, { _id }, context, info) => {
      return await Quote.findOne({ _id }).exec()
    },
    quotes: async (parent, args, context, info) => {
      const res = await Quote.find({})
        .populate()
        .exec()

      return res.map(quote => ({
        _id: quote._id.toString(),
        body: quote.body,
        author: quote.author,
        source: quote.source,
        tags: quote.tags,
        votes: quote.votes
      }))
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
