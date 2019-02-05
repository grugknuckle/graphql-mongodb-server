import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'
const mongoosePaginate = require('mongoose-paginate-v2')

ObjectID.prototype.valueOf = function() {
  return this.toString()
}

const QuoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false,
    default: 'Anonymous'
  },
  /*
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  */
  source: {
    type: String,
    required: false,
    default: 'Unknown'
  },
  tags: {
    type: [ String ],
    required: false,
    default: []
  },
  votes: {
    type: Number,
    required: false,
    default: 0
  }
})

QuoteSchema.plugin(mongoosePaginate)
export default mongoose.model('Quote', QuoteSchema)
