import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import ContactService from '../service/ContactService'
import Toast from '../toast/Toast';
import { Link, useNavigate } from 'react-router-dom'
import './css/contact-list.css'

const ContactList = () => {

     const navigate = useNavigate()
     const [contacts, setContacts] = useState([])
     const [loading, setLoading] = useState(false)
     const [search, setSearch] = useState("")

     const getContacts = async () => {
          try {
               setLoading(true)
               const { data } = await ContactService.getContacts()
               if (data.success) {
                    setContacts(data.contacts)
                    setLoading(false)
               }

          } catch (error) {
               setLoading(false)
               Toast.errorMsg(error.response.data.message)
          }
     }

     const deleteContact = async (contactId) => {
          try {
               setLoading(true)
               const { data } = await ContactService.deleteContact(contactId)
               if (data.success) {
                    getContacts()
                    Toast.successMsg(data.message)
                    setLoading(false)
               }

          } catch (error) {
               setLoading(false)
               Toast.errorMsg(error.response.data.message)
          }
     }

     useEffect(() => {
          getContacts()
     }, [])

     const handleSearch = (event) => {
          setSearch(event.target.value)
     }

     const filteredData = contacts.filter((c) =>
          c.firstName.toLowerCase().includes(search.toLowerCase())
     )


     return (
          <Layout title="Contacts | Contact App">
               <div className='d-flex d-lg-block justify-content-between'>
                    <h1 className='text-success text-center'>Contacts</h1>
                    <Link to="/add-contact" className="btn btn-success fw-bold d-md-none">
                         + New <span className='d-none d-sm-inline-block'>Contact</span>
                    </Link>
                    <p className='d-none d-lg-block'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore quaerat eius repellendus excepturi est commodi neque nisi illo voluptates natus fugiat dolor voluptatem laborum maxime molestiae, iste ducimus aliquam incidunt soluta enim eum harum aut nobis. Illo non, quidem at tempore neque optio aliquid molestias? Molestiae maxime quisquam recusandae ut, aliquid doloribus mollitia nisi, reprehenderit sunt fugiat architecto, sequi excepturi.</p>
               </div>

               <div className="row mt-2 mb-3 mb-xl-0">
                    <div className="col">
                         <div className='d-md-flex justify-content-between'>
                              <div className='col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3 border border-dark rounded-5 py-2 px-4 d-flex align-items-center'>
                                   <i className="fa fa-search me-2"></i>
                                   <input type="text"
                                        placeholder='Search contact name'
                                        className='w-100 border-0 bg-light'
                                        value={search}
                                        onChange={handleSearch} />
                                   {
                                        search && <i className="fa fa-close ms-2" onClick={() => setSearch("")}></i>
                                   }
                              </div>
                              <h4 className='text-center my-2 d-md-none d-lg-inline-block'>{filteredData.length} contact/s available</h4>
                              <Link to="/add-contact" className="btn btn-success px-4 fw-bold d-none d-md-block">
                                   + New Contact
                              </Link>
                         </div>
                    </div>
                    <h4 className='my-2 d-none d-md-inline-block d-lg-none'>{filteredData.length} contact/s available</h4>
               </div>

               <div className="row mt-lg-1  mt-xl-0 g-4">
                    {
                         contacts && filteredData.map((contact) => {
                              return (
                                   <div className="col-12 col-lg-6" key={contact._id}>
                                        <div className="card rounded-0">
                                             <div className="card-body">
                                                  <div className="row d-flex align-items-center">
                                                       <div className="col-12 col-xl-5 col-xxl-4 text-center text-xl-start text-xxl-center">
                                                            <img src={contact.photo} alt="" className='rounded-circle contact-profile' />
                                                       </div>
                                                       <div className="col-12 col-xl-6 col-xxl-7 mt-3">
                                                            <ul className='list-group'>
                                                                 <li className='list-group-item'>
                                                                      Name: <span className='fw-bold fst-italic'>{contact.firstName} {contact.lastName}</span>
                                                                 </li>
                                                                 <li className='list-group-item'>
                                                                      Email: <span className='fw-bold fst-italic'>{contact.email}</span>
                                                                 </li>
                                                                 <li className='list-group-item'>
                                                                      Age: <span className='fw-bold fst-italic'>{contact.age}</span>
                                                                 </li>
                                                            </ul>
                                                       </div>
                                                       <div className="col-12 col-xl-1 mt-xxl-3 text-center d-xxl-flex flex-column">
                                                            <i className="fa fa-eye text-primary" onClick={() => navigate(`/view-contact/${contact._id}`)}></i>
                                                            <i className="fa fa-pen text-success my-3 my-xxl-4 mx-5 mx-xl-0" onClick={() => navigate(`/update-contact/${contact._id}`)}></i>
                                                            <i className="fa fa-trash text-danger" onClick={() => deleteContact(contact._id)}></i>
                                                       </div>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              )
                         })
                    }
               </div>
          </Layout>
     )
}

export default ContactList