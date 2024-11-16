import React, { useEffect, useState } from 'react'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { Transition } from '../../../Constants/Constant';

const UserInfoItem = ({id }) => {
    const [userData, setUserData] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    let navigate = useNavigate()

    const updateUser = async () => {
        try {
            await axios.put(`http://localhost:8080/api/v1/users/${id}`, userData, {
                withCredentials: true
            });
            toast.success("User updated successfully", { autoClose: 500, theme: 'colored' });
            setOpenUpdateDialog(false);
            navigate(-1);
        } catch (error) {
            toast.error(error.response?.data || "An error occurred", { autoClose: 500, theme: 'colored' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value 
        });
    };



    useEffect(() => {
        const fetchData = async () => {
    
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
                    withCredentials: true
                });
                setUserData(response.data.payload); 
            } catch (error) {
                toast.error(error.response?.data || "An error occurred", { autoClose: 500, theme: 'colored' });
            }
        };
    
        fetchData();
    }, [id]);

    const deleteAccount = async () => {
        try {
            const deleteUser = await axios.delete(`http://localhost:8080/api/v1/users/${id}`, {
                withCredentials: true
            });
            toast.success("Account deleted successfully", { autoClose: 500, theme: 'colored' })
            navigate(-1);

        } catch (error) {
            toast.error(error.response.data, { autoClose: 500, theme: 'colored' })

        }
    }


    return (
        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: 10 }}>
            <Typography variant='h6' fontWeight="bold" sx={{ margin: '20px 0' }}>User Details</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                        label="First Name"
                        name='name'
                        value={userData.name || ''}
                        variant="outlined"
                        fullWidth
                        onChange={handleInputChange} // Input değişikliğini takip ediyoruz
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                        label="Last Name"
                        name='surname'
                        value={userData.surname || ''}
                        variant="outlined"
                        fullWidth
                        onChange={handleInputChange} // Input değişikliğini takip ediyoruz
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                        label="Username"
                        name='username'
                        value={userData.username || ''}
                        variant="outlined"
                        fullWidth
                        onChange={handleInputChange} // Input değişikliğini takip ediyoruz
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                        label="Email"
                        name='email'
                        value={userData.email || ''}
                        variant="outlined"
                        fullWidth
                        onChange={handleInputChange} // Input değişikliğini takip ediyoruz
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "25px 0", width: '100%' }}>
                <Button variant='contained' color='primary' onClick={() => setOpenUpdateDialog(true)}>Update User</Button>
                <Button variant='contained' color='error' endIcon={<AiFillDelete />} onClick={() => setOpenAlert(true)}>Delete</Button>
            </Box>

            <Dialog
                open={openUpdateDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenUpdateDialog(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                    <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                        <Typography variant='body1'> Are you sure you want to update the user's details?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' color='primary' onClick={updateUser}>Update</Button>
                    <Button variant='contained' color='secondary' onClick={() => setOpenUpdateDialog(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenAlert(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                    <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                        <Typography variant='body1'> {userData.name} {userData.surname}'s all data will be erased</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' endIcon={<AiFillDelete />} color='error' onClick={deleteAccount}>Delete</Button>
                    <Button variant='contained' color='primary'
                        onClick={() => setOpenAlert(false)} endIcon={<AiFillCloseCircle />}>Cancel</Button>
                </DialogActions>
            </Dialog>

        </Container >
    )
}

export default UserInfoItem