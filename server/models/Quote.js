import mongoose from 'mongoose'
import { ObjectID } from 'mongodb'

const Schema = mongoose.Schema

ObjectID.prototype.valueOf = function() {
  return this.toString()
}

const QuoteSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  */
  source: {
    type: String,
    required: false,
    default: 'Unknown'
  },
  // tags: [ String ],
  votes: {
    type: Number,
    required: false,
    default: 0
  }
})

export default mongoose.model('Quote', QuoteSchema)
