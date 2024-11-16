import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SingleCategory/SingleCategory';
import MobileNavigation from './Navigation/MobileNavigation';
import DesktopNavigation from './Navigation/DesktopNavigation';
import Wishlist from './Pages/WhisList/Wishlist';
import BlacklistPage from './Pages/Blacklist/BlacklistPage';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHomePage from './Admin/Pages/AdminHomePage';
import SingleUserPage from './Admin/Pages/SingleUserPage';
import SingleSellerPage from './Admin/Pages/SingleSellerPage';
import SingleProduct from './Admin/Pages/SingleProduct';
import { useEffect, useState } from 'react';
import AdminRoute from './Navigation/AdminRoute';
import PrivateRoute from './Navigation/PrivateRoute';

function App() {

  return (
    <>
      <ToastContainer toastClassName='toastContainerBox' transition={Flip} position='top-center' />
      <Router>
        <DesktopNavigation />
        <div className='margin'>

          <Routes>

            <Route path='/admin/home' element={
              <AdminRoute>
                <AdminHomePage />
              </AdminRoute>
            } />
            <Route path='/admin/home/user/:id' element={
              <AdminRoute>
                <SingleUserPage />
              </AdminRoute>
            } />
            <Route path='/seller/:id' element={
              <AdminRoute>
                <SingleSellerPage />
              </AdminRoute>
            } />
            <Route path='/admin/home/product/:id' element={
              <AdminRoute>
                <SingleProduct />
              </AdminRoute>
            } />


            <Route path='/' index element={<HomePage />} />
            <Route path="/login" element={< Login />} />

            <Route path='/Detail/:id' element={
              <PrivateRoute>
                <ProductDetail />
              </PrivateRoute>
            } />

            <Route path='/product' element={
              <PrivateRoute>
                <SingleCategory />
              </PrivateRoute>
            } />

            <Route path='/wishlist' element={
              <PrivateRoute>
                <Wishlist />
              </PrivateRoute>
            } />

            <Route path='/blacklist' element={
              <PrivateRoute>
                <BlacklistPage />
              </PrivateRoute>
            } />
          </Routes>

        </div>
        <MobileNavigation />
      </Router >


    </>
  );
}
export default App;