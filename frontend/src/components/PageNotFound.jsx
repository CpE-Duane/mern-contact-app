import React from 'react'
import Layout from './layout/Layout';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Layout title="Page Not Found | Contact App">
        <div className='h-100 d-flex justify-content-center align-items-center flex-column'>
            <h1 style={{fontSize: "120px"}} className='text-danger'>Oops!</h1>
            <h1 className='my-3'>404 - PAGE NOT FOUND </h1>
            <h5>The page you are looking for might have been removed.</h5>
            <Link to="/" className='btn btn-outline-primary fw-bold mt-3 btn-lg'>GO TO HOMEPAGE</Link>
        </div>
    </Layout>
  )
}

export default PageNotFound