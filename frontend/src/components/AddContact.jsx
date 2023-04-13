import React, { useState } from 'react'
import Layout from './layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import contactSchema from './../Schema/ContactSchema';
import { Spinner } from 'react-bootstrap'
import ContactService from './../service/ContactService';
import Toast from '../toast/Toast';
import './css/add-contact.css'

const AddContact = () => {

     const navigate = useNavigate()
     const [loading, setLoading] = useState(false)
     const [imgFile, setImgFile] = useState(null)
     const [imgURL, setImgURL] = useState(null)

     const { register, handleSubmit, formState: { errors } } = useForm({
          resolver: yupResolver(contactSchema)
     })

     const onSubmit = async (payload, e) => {
          e.preventDefault()
          try {
               const addContactPayload = {
                    ...payload,
                    photo: imgURL
               }

               setLoading(true)
               const { data } = await ContactService.addContact(imgURL ? addContactPayload : payload)
               Toast.successMsg(data.message)
               setLoading(false)
               navigate("/")

          } catch (error) {
               Toast.errorMsg(error.response.data.message)
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
          <Layout title="Add Contact | Contact App">
               <h1 className='text-success text-center'>Add Contact</h1>
               <p className='d-none d-lg-block'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus labore accusamus eveniet sit in. Aperiam, adipisci. Pariatur ut unde, eos consequatur cumque minima nihil sequi autem, voluptatem quae, error commodi dolorum odio sit placeat sint at quos. Repellendus labore quasi aliquid delectus minus temporibus quam esse quo soluta voluptatem, aperiam, magnam necessitatibus modi a architecto aliquam nemo fugit? Vero, delectus?</p>

               <form onSubmit={handleSubmit(onSubmit)} >
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
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Phone<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
                                        <input type="text"
                                             className='form-control'
                                             placeholder='Ex: +123456789'
                                             {...register("phone")} />
                                        <span className="text-danger form-text">{errors.phone?.message}</span>
                                   </div>
                              </div>
                              <div className="row mb-3">
                                   <div className="col-12 col-md-4 d-flex align-items-center fw-bold text-secondary">
                                        Address<span className='text-danger'>*</span>
                                   </div>
                                   <div className="col-12 col-md-8">
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
                                                  <Link to="/" className='btn btn-dark rounded-0' type='button'>Cancel</Link>
                                             </div>
                                             <div className="col-6 d-grid">
                                                  <button className='btn btn-success rounded-0' type='submit'>
                                                       {
                                                            loading ? <Spinner animation="border" size="sm" /> : 'Add'
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
                                             <p>Drop an image here or click to select</p>
                                        )
                                   }
                              </div>
                              <input
                                   type="file"
                                   id="file"
                                   name='photo'
                                   className='d-none'
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
                                                  loading ? <Spinner animation="border" size="sm" /> : 'Add'
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

export default AddContact