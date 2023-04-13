import axios from 'axios'
const serverURL = "http://localhost:5000"

const getContacts = () => {
     return axios.get(`${serverURL}/api/contacts/get-contacts`)
}

const addContact = (payload) => {
     return axios.post(`${serverURL}/api/contacts/add-contact`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const deleteContact = (contactId) => {
     return axios.delete(`${serverURL}/api/contacts/delete-contact/${contactId}`)
}

const getContact = (contactId,) => {
     return axios.get(`${serverURL}/api/contacts/get-contact/${contactId}`)
}

const updateContact = (contactId, payload) => {
     return axios.put(`${serverURL}/api/contacts/update-contact/${contactId}`, payload, {
          headers: {
               "Content-Type": "application/json"
          }
     })
}

const uploadImage = (formData) => {
     return axios.post(`${serverURL}/api/contacts/upload-image`, formData)
}


const ContactService = {
     getContacts,
     addContact,
     deleteContact,
     getContact,
     updateContact,
     uploadImage
}

export default ContactService