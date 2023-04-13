import React from 'react'
import '../css/navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
     return (
          <>
               <nav className='navbar container-fluid bg-dark text-white px-2 px-sm-5 d-flex justify-content-start'>
                         <i className="fa fa-mobile fa-2x"></i>
                         <Link to="/" className='btn btn-default text-white'><h3 className='m-0'>Contact App</h3></Link>
               </nav>
          </>
     )
}

export default Navbar