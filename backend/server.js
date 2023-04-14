const express = require('express')
const dotenv = require("dotenv")
const contactRoutes = require("./routes/contactRoutes")
const connectDB = require('./config/db')
const cors = require('cors')



dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT


app.use("/api/contacts", contactRoutes)
app.use('/images', express.static('images'))



app.listen(PORT, () => {
     console.log(`Server is running on PORT: ${PORT}`)
})