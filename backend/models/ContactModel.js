const mongoose = require("mongoose")

const contactSChema = mongoose.Schema(
     {
          firstName: {
               type: String,
               required: true,
          },
          lastName: {
               type: String,
               required: true,
          },
          email: {
               type: String,
               required: true,
               unique: true
          },
          age: {
               type: Number,
               required: true
          },
          phone: {
               type: String,
               required: true,
          },
          address: {
               type: String,
               required: true,
          },
          occupation: {
               type: String,
               default: "N/A"
          },
          photo: {
               type: String,
               default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUMjctR2VlOPWEFdgtAZN0antK09YC3VkcwAvDV8af9I-aFT6MFztKre2hpIq0XDhTd4&usqp=CAU"
          }
     }, 
     {
          timestamps: true
     }
)

const Contact = mongoose.model("Contact", contactSChema)

module.exports = Contact