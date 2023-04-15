import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import contactSchema from './../Schema/ContactSchema';
import { Spinner } from 'react-bootstrap'
import ContactService from './../service/ContactService';
import Toast from '../toast/Toast';
import { useNavigate, Link, useParams } from 'react-router-dom';

const UpdateContact = () => {

     const { id } = useParams()
     const navigate = useNavigate()
     const [loading, setLoading] = useState(false)
     const [contact, setContact] = useState({})
     const [imgFile, setImgFile] = useState(null)
     const [imgURL, setImgURL] = useState(null)

     const getContact = async () => {
          try {
               setLoading(true)
               const { data } = await ContactService.getContact(id)
               setContact(data.contact)
               reset(data.contact)

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     useEffect(() => {
          getContact()
     }, [id])

     const { register, handleSubmit, formState: { errors }, reset } = useForm({
          resolver: yupResolver(contactSchema),
     })


     const onSubmit = async (payload, e) => {
          e.preventDefault()
          try {
               setLoading(true)
               const updatedPayload = {
                    ...payload,
                    photo: imgURL
               }

               const { data } = await ContactService.updateContact(id, imgURL ? updatedPayload : payload)
               Toast.successMsg(data.message)
               navigate('/')
          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          } finally {
               setLoading(false)
          }
     }

     const handleFileSelect = async (e) => {
          try {
               const file = e.target.files[0]
               setImgFile(file)
               const formData = new FormData()
               formData.append('photo', file)

               const { data } = await ContactService.uploadImage(formData)
               setImgURL(data.imageUrl)

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          }
     };

     const handleDragOver = (e) => {
          e.preventDefault();
     };

     const handleDrop = async (e) => {
          try {
               e.preventDefault();
               const file = e.dataTransfer.files[0];
               setImgFile(file)
               const formData = new FormData()
               formData.append("photo", file)

               const { data } = await ContactService.uploadImage(formData)
               setImgURL(data.imageUrl)

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
          }
     };


     return (
          <Layout title="Update Contact | Contact App">
               <h1 className='text-success text-center'>Update Contact</h1>
               <p className='d-none d-lg-block'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas accusamus aliquid sint voluptate placeat sequi cum sed dolores obcaecati! Inventore amet officia quia voluptatum! Iusto non odit placeat adipisci dicta molestias sed deleniti eveniet rerum laborum commodi ipsa, vel quae aliquid earum aperiam sequi facilis fuga dolorem accusamus temporibus. Asperiores quaerat adipisci, obcaecati quia porro nam commodi explicabo ab! Distinctio!</p>

               <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mt-4">
                         <div className="col-12 col-lg-7 col-xl-7 col-xxl-5">
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        First Name<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
                                        <input type="text"
                                             className='form-control'
                                             placeholder='Ex: Duane'
                                             {...register("firstName")} />
                                        <span className="text-danger form-text">{errors.firstName?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Last Name<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
                                        <input type="text"
                                             className='form-control'
                                             placeholder='Ex: Villapando'
                                             {...register("lastName")} />
                                        <span className="text-danger form-text">{errors.lastName?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Email<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
                                        <input type="email"
                                             className='form-control'
                                             placeholder='Ex: vduane@gmail.com'
                                             {...register("email")} />
                                        <span className="text-danger form-text">{errors.email?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Age<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
                                        <input type="number"
                                             className='form-control'
                                             placeholder='Ex: 23'
                                             {...register("age")} />
                                        <span className="text-danger form-text">{errors.age?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-4 col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Phone<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-8 col-12 col-md-8">
                                        <input type="text"
                                             className='form-control'
                                             placeholder='Ex: +123456789'
                                             {...register("phone")} />
                                        <span className="text-danger form-text">{errors.phone?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4  d-flex align-items-center fw-bold text-secondary">
                                        Address<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-8 col-12 col-md-8">
                                        <input type="text"
                                             className='form-control'
                                             placeholder='Ex: Pampanga, Philippines'
                                             {...register("address")} />
                                        <span className="text-danger form-text">{errors.address?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Occupation<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
                                        <input type="text"
                                             className='form-control'
                                             placeholder='Ex: Programmer'
                                             {...register("occupation")} />
                                        <span className="text-danger form-text">{errors.occupation?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3 d-none d-lg-flex">
                                   <div className="col-12 col-md-4"></div>
                                   <div className="col-12 col-md-8">
                                        <div className="row">
                                             <div className="col-6 d-grid">
                                                  <Link to="/" className='btn btn-dark' type='button'>Cancel</Link>
                                             </div>
                                             <div className="col-6 d-grid">
                                                  <button className='btn btn-success' type='submit'>
                                                       {
                                                            loading ? <Spinner animation="border" size="sm" /> : 'Update'
                                                       }
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="col-12 col-md-8 col-lg-5 col-xl-4 col-xxl-3 ms-auto ms-lg-0">
                              <div className="dropzone"
                                   onDragOver={handleDragOver}
                                   onDrop={handleDrop}
                                   onClick={() => document.getElementById('file').click()}>
                                   {
                                        imgFile ? (
                                             <img src={URL.createObjectURL(imgFile)}
                                                  alt="Selected file"
                                                  className="img-fluid"
                                             />
                                        ) : (
                                             // <p>Drop an image here or click to select</p>
                                             <img src={contact.photo}
                                                  alt="Selected file"
                                                  className="img-fluid"
                                             />
                                        )
                                   }
                              </div>
                              <input
                                   type="file"
                                   id="file"
                                   name='photo'
                                   className='d-none'
                                   accept="image/*"
                                   onChange={handleFileSelect} />
                         </div>
                    </div>
                    <div className="row d-lg-none">
                         <div className="col-md-4 d-none d-md-flex"></div>
                         <div className="col-12 col-md-8">
                              <div className="row">
                                   <div className="col-6 d-grid">
                                        <Link to="/" className='btn btn-dark rounded-0' type='button'>Cancel</Link>
                                   </div>
                                   <div className="col-6 d-grid">
                                        <button className='btn btn-success rounded-0' type='submit'>
                                             {
                                                  loading ? <Spinner animation="border" size="sm" /> : 'Update'
                                             }
                                        </button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </form>
          </Layout >
     )
}

export default UpdateContact