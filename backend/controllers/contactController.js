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

          const contact = await Contact.create(req.body)

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

          const contact = await Contact.findOne({ email })
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

          console.log(contacts)

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
          if (!req.file) {
               res.status(400).send({
                    success: false,
                    message: 'No file uploaded',
               });
               return;
          }

          const imageUrl = `http://localhost:5000/images/${req.file.filename}`;

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

const getImage = async (req, res) => {
     // try {
     //      if (!req.file) {
     //           res.status(400).send({
     //                success: false,
     //                message: 'No file uploaded',
     //           });
     //           return;
     //      }

     //      const imageUrl = `http://localhost:5000/images/${req.file.filename}`;

     //      res.status(201).send({
     //           success: true,
     //           message: 'Image uploaded successfully',
     //           imageUrl: imageUrl,
     //      });
     // } catch (error) {
     //      console.error(error);
     //      res.status(500).send({
     //           success: false,
     //           message: 'Error while uploading image',
     //      });
     // }
}

const ContactController = {
     addContact,
     updateContact,
     getContacts,
     getContact,
     deleteContact,
     uploadImage,
     getImage
}

module.exports = ContactController