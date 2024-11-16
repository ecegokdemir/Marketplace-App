import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { MdOutlineCancel, MdPersonAddAlt1 } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Transition } from '../../Constants/Constant';


const AddSeller = ({ getSeller }) => {
    const [open, setOpen] = useState(false);
    const [credentials, setCredentials] = useState({ name: "", })
    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (!credentials.name) {
                toast.error("Please Fill the all Fields", { autoClose: 500, theme: 'colored' })
            }
            else if (credentials.name.length < 3 ) {
                toast.error("Please enter name with more than 3 characters", { autoClose: 500, theme: 'colored' })
            }
            else if (credentials.name) {
                const sendAuth = await axios.post("http://localhost:8080/api/v1/sellers",
                    {
                        name: credentials.name,
                    }, { withCredentials: true })
                    console.log(sendAuth , "sendAuth")
                    console.log(sendAuth.data, "sendAuth.data")
                const receive = await sendAuth.data
                setOpen(false);
                if (receive.code === 10000) {
                    getSeller()
                    toast.success("Registered Successfully", { autoClose: 500, theme: 'colored' })
                    setCredentials({
                        name: "",
                    })
                }
                else {
                    toast.error("Some thing went wrong", { autoClose: 500, theme: 'colored' })
                }
            }
        } catch (error) {
            toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' })
        }

    }
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "20px 0" }} >
                <Typography variant='h6' textAlign='center' color="#1976d2" fontWeight="bold">Add new seller
                </Typography>
                <Button variant='contained' endIcon={<MdPersonAddAlt1 />} onClick={handleClickOpen}>Add</Button>
            </Box>
            <Divider sx={{ mb: 5 }} />
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}>
                <DialogTitle sx={{ textAlign: "center", fontWeight: 'bold', color: "#1976d2" }}> Add new seller</DialogTitle>
                <DialogContent>
                    <Box onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    value={credentials.name}
                                    onChange={handleOnChange}
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>     
                        </Grid>
                        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 2 }}>
                            <Button fullWidth variant='contained' color='error' onClick={handleClose} endIcon={<MdOutlineCancel />}>Cancel</Button>
                            <Button type="submit" onClick={handleSubmit} fullWidth variant="contained" endIcon={<MdPersonAddAlt1 />}>Add</Button>
                        </DialogActions>
                    </Box >
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddSeller