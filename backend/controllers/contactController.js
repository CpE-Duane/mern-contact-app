const mongoose = require("mongoose")
const Contact = require("../models/ContactModel")


const addContact = async (req, res) => {
     try {
          const { firstName, lastName, email, age, phone, address, occupation } = req.body
          if (!firstName || !lastName || !email || !age || !phone || !address || !occupation) {
               return res.status(404).send({
                    success: false,
                    message: "All fields are required."
               })
          }

          const contactExist = await Contact.findOne({ email })
          if (contactExist) {
               return res.status(401).send({
                    success: false,
                    message: "Contact already exist."
               })
          }

          const contactData = { 
               firstName, 
               lastName, 
               email, 
               age, 
               phone, 
               address, 
               occupation
          };
          
          if (req.file) {
               const imageUrl = `https://mern-contact-app-api.onrender.com/images/${req.file.filename}`;
               contactData.photo = imageUrl;
          }

          const contact = await Contact.create(contactData);

          if (!contact) {
               return res.status(400).send({
                    success: false,
                    message: "Error while adding contact."
               })
          }

          return res.status(201).send({
               success: true,
               message: "Contact added successfully.",
               contact: contact
          })


     } catch (error) {
          return res.status(500).send({
               success: false,
               message: error.message
          })
     }
}


const updateContact = async (req, res) => {
     try {
          const { id } = req.params
          const { firstName, lastName, email, age, phone, address, occupation } = req.body
          if (!firstName || !lastName || !email || !age || !phone || !address || !occupation) {
               return res.status(404).send({
                    success: false,
                    message: "All fields are required."
               })
          }

          const contact = await Contact.findOne({ _id: id })
          if (!contact) {
               return res.status(400).send({
                    success: false,
                    message: "Contact not found.",
               })
          }

          const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
          if (!updatedContact) {
               return res.status(400).send({
                    success: false,
                    message: "Error while updating contact."
               })
          }

          res.status(200).send({
               success: true,
               message: "Contact updated successfully.",
               updatedContact: updatedContact
          })


     } catch (error) {
          return res.status(500).send({
               success: false,
               message: error.message
          })
     }
}

const getContacts = async (req, res) => {
     try {
          const contacts = await Contact.find({})
          if (!contacts) {
               return res.status(404).send({
                    success: false,
                    message: "Error while fetching category."
               })
          }

          return res.status(200).send({
               success: true,
               message: "Contacts fetch successfully.",
               contacts: contacts
          })

     } catch (error) {
          return res.status(500).send({
               success: false,
               message: error.message
          })
     }
}

const getContact = async (req, res) => {
     try {
          const { id } = req.params
          const contact = await Contact.findOne({ _id: new mongoose.Types.ObjectId(id) })
          if (!contact) {
               return res.status(404).send({
                    success: false,
                    message: "Contact not found."
               })
          }

          return res.status(201).send({
               success: true,
               message: "Contact fetch successfully.",
               contact: contact
          })

     } catch (error) {
          return res.status(500).send({
               success: false,
               message: error.message
          })
     }
}

const deleteContact = async (req, res) => {
     try {
          const { id } = req.params
          const contact = await Contact.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(id) })
          if (!contact) {
               return res.status(404).send({
                    success: false,
                    message: "Contact not found."
               })
          }

          return res.status(200).send({
               success: true,
               message: "Contact deleted successfully.",
               contact: contact
          })

     } catch (error) {
          return res.status(500).send({
               success: false,
               message: error.message
          })
     }
}

const uploadImage = async (req, res) => {
     try {
          if (!req.file && req.body.photo) {
               res.status(400).send({
                    success: false,
                    message: 'No file uploaded',
               });
               return;
          }

          const imageUrl = `https://mern-contact-app-api.onrender.com/images/${req.file.filename}`;

          res.status(201).send({
               success: true,
               message: "Image uploaded successfully.",
               imageUrl: imageUrl
          })

     } catch (error) {
          res.status(500).send({
               success: false,
               message: "Error while uploading image."
          })
     }
}

const ContactController = {
     addContact,
     updateContact,
     getContacts,
     getContact,
     deleteContact,
     uploadImage,
}

module.exports = ContactController