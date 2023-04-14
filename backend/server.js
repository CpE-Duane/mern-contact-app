const express = require('express')
const dotenv = require("dotenv")
const contactRoutes = require("./routes/contactRoutes")
const connectDB = require('./config/db')
const cors = require('cors')
const corsOptions = require("./config/corsOptions")

const fs = require('fs');
const path = require('path');


dotenv.config()
connectDB()
const app = express()
app.use(cors(corsOptions))
app.use(express.json())

const PORT = process.env.PORT

// Get the path of the images directory
const imagesDirPath = path.join(__dirname, 'images');

// Create the images directory if it doesn't exist
if (!fs.existsSync(imagesDirPath)) {
  fs.mkdirSync(imagesDirPath);
}

app.use("/api/contacts", contactRoutes)
app.use('/images', express.static('images'))



app.listen(PORT, () => {
     console.log(`Server is running on PORT: ${PORT}`)
})