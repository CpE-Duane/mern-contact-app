import React from 'react'
import { Helmet } from 'react-helmet'
import Navbar from './Navbar'
import Footer from './Footer';
import '../css/layout.css'

const Layout = ({ children, title }) => {
     return (
          <>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <meta name="description" content="Free Web tutorials" />
                    <meta name="keywords" content="HTML, CSS, JavaScript" />
                    <meta name="author" content="Duane Villapando" />
               </Helmet>

               <Navbar />
               <div className='layout px-2 px-sm-5 py-3 bg-light'>
                    {children}
               </div>
               <Footer />
          </>
     )
}

export default Layout