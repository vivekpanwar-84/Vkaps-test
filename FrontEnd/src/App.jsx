import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Listing from './Pages/Listing'
import Login from './Pages/Login'
import EditListing from './Pages/Edit'
import { ToastContainer, toast } from 'react-toastify';
import { useTheme } from "./context/ThemeContext";
import AddNew from './Pages/AddNew'
import { useEffect, useState } from 'react'


const App = () => {
  const { isDark, toggleTheme } = useTheme();
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])




  return (
    <div>
      <ToastContainer />


      <Navbar />
      {

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/edit' element={<EditListing token={token} />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/product/:id' element={<Listing />} />
          <Route path='/product/:productId/edit' element={<EditListing token={token} />} />
          <Route path='/addNewProduct' element={<AddNew token={token} />} />
        </Routes>
      }

    </div>
  )
}

export default App
