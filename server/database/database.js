import mongoose from "mongoose"

export default function (db) {
  // Connect to MongoDB with Mongoose.
  mongoose.set('useFindAndModify', false) // suppress deprecation warning ... see https://github.com/Automattic/mongoose/issues/7108
  mongoose
    .connect(
      db,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
    .then(() => console.log(`MongoDB connected to ${db.split('/').pop()}`))
    .catch(err => console.log(err))
}

