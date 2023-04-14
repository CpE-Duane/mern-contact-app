const mongoose = require('mongoose')

const connectDB = async () => {
     try {
          const connect = await mongoose.connect(process.env.MONGO_URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          })

          console.log(`Connected to MongoDB: ${connect.connection.host}`)
     } catch (error) {
          console.log(`Error in MongoDB: ${error}`)
     }
}

module.exports = connectDB