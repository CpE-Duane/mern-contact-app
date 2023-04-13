import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout';
import { Link, useParams } from 'react-router-dom';
import ContactService from './../service/ContactService';
import Toast from '../toast/Toast';

const ViewContact = () => {

     const { id } = useParams()
     const [contact, setContact] = useState({})
     const [loading, setLoading] = useState(false)

     const getContact = async () => {
          try {
               setLoading(true)
               const { data } = await ContactService.getContact(id)
               if (data.success) {
                    setContact(data.contact)
                    setLoading(false)
               }

          } catch (error) {
               setLoading(false)
               Toast.errorMsg(error.response.data.message)
          }
     }

     useEffect(() => {
          getContact()
          console.log(id);
     }, [])

     return (
          <Layout title="View Contact | Contact App">
               <h1 className='text-success text-center'>View Contact</h1>
               <p className='d-none d-lg-block'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, reprehenderit facilis. Aut iusto cupiditate ducimus! Assumenda, temporibus. Quae harum repellat similique consectetur explicabo iusto pariatur cumque eveniet! Magni cumque ut saepe tenetur, itaque ratione animi laudantium reiciendis aspernatur doloremque? Sapiente fuga ullam itaque dignissimos id nobis atque, placeat tempora praesentium veritatis sunt modi quibusdam est debitis porro dolorum, quia deleniti.</p>

               <div className="row mt-5 d-flex justify-content-center align-content-center">
                    <div className="col-12 col-lg-5 col-xl-4 text-center">
                         <img src={contact.photo} alt="" className='rounded-circle w-50' />
                    </div>
                    <div className="col-12 col-lg-5 col-xl-4 mt-3 mt-lg-0">
                         <ul className='list-group'>
                              <li className="list-group-item">First Name: <span className='fw-bold fst-italic'>{contact.firstName}</span></li>
                              <li className="list-group-item">Last Name: <span className='fw-bold fst-italic'>{contact.lastName}</span></li>
                              <li className="list-group-item">Email: <span className='fw-bold fst-italic'>{contact.email}</span></li>
                              <li className="list-group-item">Age: <span className='fw-bold fst-italic'>{contact.age}</span></li>
                              <li className="list-group-item">Phone: <span className='fw-bold fst-italic'>{contact.phone}</span></li>
                              <li className="list-group-item">Address: <span className='fw-bold fst-italic'>{contact.address}</span></li>
                              <li className="list-group-item">Occupation: <span className='fw-bold fst-italic'>{contact.occupation}</span></li>
                         </ul>
                         <div className='d-grid d-lg-flex'>
                              <Link to="/" className='btn btn-dark mt-3 mt-lg-5 px-5'>Back</Link>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}

export default ViewContact