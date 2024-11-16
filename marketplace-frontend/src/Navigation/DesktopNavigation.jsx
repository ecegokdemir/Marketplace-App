import './Desktop.css'
import { AiTwotoneBook } from "react-icons/ai";
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, Slide, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { getWishList, handleLogOut, handleClickOpen, handleClose, Transition } from '../Constants/Constant'

const DesktopNavigation = () => {

  const {wishlistData, setWishlistData, blackListData, setBlackListData } = useContext(ContextFunction)
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate()
  let authToken = localStorage.getItem('userInfo');
  let isAdmin = localStorage.getItem('isAdmin');

  return (
    <>
      <nav className='nav'>
        <div className="logo">
          {
            isAdmin === "true" ?
              <>
                <Link to={'/admin/home'}>
                  <span >Kitapevi</span>
                </Link>
              </>
              :
              <Link to={authToken ? '/product' : '/'}>
                <span >Kitapevi</span>
              </Link>
          }
        </div>
        <div className="nav-items">
          <ul className="nav-items">
            {authToken && isAdmin === "false" && (
              <>
                <li className="nav-links">
                  <Tooltip title='Wishlist'>
                    <NavLink to="/wishlist">
                      <span className='nav-icon-span'>
                        Wishlist
                        <Badge badgeContent={wishlistData.length} color="secondary">
                          <AiOutlineHeart className='nav-icon' />
                        </Badge>
                      </span>
                    </NavLink>
                  </Tooltip>
                </li>

                <li className="nav-links">
                  <Tooltip title='Blacklist'>
                    <NavLink to="/blacklist">
                      <span className='nav-icon-span'>
                        Blacklist
                        <Badge badgeContent={blackListData.length} color="error">
                          <AiFillCloseCircle className='nav-icon' />
                        </Badge>
                      </span>
                    </NavLink>
                  </Tooltip>
                </li>
              </>
            )}

            {
              authToken ?
                <>
                  <li style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }} onClick={() => handleClickOpen(setOpenAlert)}>
                    <Button variant='contained' className='nav-icon-span' sx={{ marginBottom: 1 }} endIcon={<FiLogOut />}>
                      <Typography variant='button'> Logout</Typography>
                    </Button>
                  </li>
                </>
                :
                <li className="nav-links">
                  <Tooltip title='Login'>
                    <NavLink to='/login'>
                      <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29, marginTop: 7 }} /></span>
                    </NavLink>
                  </Tooltip>
                </li>
            }
          </ul>
        </div>
      </nav >
      <Dialog
        open={openAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
          <Typography variant='h6'>  Do You Want To Logout?</Typography>
        </DialogContent>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Link to="/">
            <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={() => handleLogOut(authToken, toast, navigate, setOpenAlert)}>Logout</Button></Link>
          <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={() => handleClose(setOpenAlert)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default DesktopNavigation