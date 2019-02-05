import mongoose from 'mongoose'
import { models } from './models'

export default function (db) {
  // Connect to MongoDB with Mongoose.
  mongoose.set('useFindAndModify', false) // suppress deprecation warning ... see https://github.com/Automattic/mongoose/issues/7108
  return mongoose
    .connect(
      db,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
    .then(() => {
      console.log(`MongoDB connected to ${db.split('/').pop()}`)
      return models
    })
    .catch(err => console.log(err))
}

