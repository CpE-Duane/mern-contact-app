import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import UpdateContact from './components/UpdateContact';
import ViewContact from './components/ViewContact';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from 'react-toastify'


const App = () => {
     return (
          <>
               <ToastContainer limit={1} />
               <Routes>
                    <Route path='/' element={<ContactList />} />
                    <Route path='/add-contact' element={<AddContact />} />
                    <Route path='/update-contact/:id' element={<UpdateContact />} />
                    <Route path='/view-contact/:id' element={<ViewContact />} />
                    <Route path='*' element={<PageNotFound />} />
               </Routes>
          </>
     )
}

export default App