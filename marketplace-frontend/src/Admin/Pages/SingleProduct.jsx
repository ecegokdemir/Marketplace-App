import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, Grid, TextField, Typography, Skeleton } from '@mui/material';
import { AiFillCloseCircle, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { Transition } from '../../Constants/Constant';
import CopyRight from '../../Components/CopyRight/CopyRight';

const SingleProduct = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
    const { id } = useParams();

    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        image: "",
        price: "",
        category: null,
    });

    const handleOnChange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    useEffect(() => {
        getSingleProduct();
        window.scroll(0, 0);
    }, []);

    const getSingleProduct = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/${id}`, { withCredentials: true });
            setProductInfo({
                name: data.payload.productName,
                description: data.payload.description,
                image: data.payload.image,
                price: data.payload.price,
                category: null, // Handle category if available
            });
            setProduct(data.payload);
        } catch (error) {
            setError(true);
            toast.error("Failed to fetch product details", { autoClose: 500 });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productInfo.name || !productInfo.price || !productInfo.description) {
            toast.error("All fields are required", { autoClose: 500 });
            return;
        }
        try {
            const { data } = await axios.put(`http://localhost:8080/api/v1/products/${id}`, productInfo, { withCredentials: true });
            if (data.code === 10000) {
                toast.success("Product updated successfully", { autoClose: 500 });
                navigate(-1);
            } else {
                toast.error("Something went wrong", { autoClose: 500 });
            }
        } catch (error) {
            toast.error("Something went wrong", { autoClose: 500 });
        }
    };

    const deleteProduct = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/products/${id}`, { withCredentials: true });
            if (data) {
                toast.success("Product deleted successfully", { autoClose: 500 });
                navigate(-1);
            } else {
                toast.error("Something went wrong", { autoClose: 500 });
            }
        } catch (error) {
            toast.error(error.response?.data || "An error occurred", { autoClose: 500 });
        }
    };

    return (
        <>
            <Container sx={{ width: '100%', paddingY: 5 }}>
                {loading ? (
                    <section style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                        <Skeleton variant='rectangular' height={200} width={200} />
                        <Skeleton variant='text' height={400} width={700} />
                    </section>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 4 }}>
                            <img src={productInfo.image} alt={productInfo.name} style={{ maxWidth: '100%', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }} />
                            <Typography variant='h4' sx={{ marginTop: 2, fontWeight: 'bold', textAlign: 'center' }}>
                                {productInfo.name}
                            </Typography>
                        </Box>
                        <form autoComplete="off" onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 600 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Name"
                                        name='name'
                                        value={productInfo.name}
                                        variant="outlined"
                                        fullWidth
                                        onChange={handleOnChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Price"
                                        name='price'
                                        value={productInfo.price}
                                        onChange={handleOnChange}
                                        variant="outlined"
                                        inputMode='numeric'
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={productInfo.description}
                                        onChange={handleOnChange}
                                        label="Description"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        variant="outlined"
                                        name='description'
                                        sx={{ marginBottom: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 4, width: '100%', maxWidth: 600 }}>
                            <Button variant='contained' color='primary' onClick={() => setOpenUpdateDialog(true)}>Update Product</Button>
                            <Button variant='contained' color='error' endIcon={<AiFillDelete />} onClick={() => setOpenAlert(true)}>Delete</Button>
                        </Box>
                    </Box>
                )}
                <Dialog
                    open={openUpdateDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenUpdateDialog(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            <Typography variant='body1'>Are you sure you want to update the product details?</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant='contained' color='primary' onClick={handleSubmit}>Update</Button>
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
                            <Typography variant='body1'>{productInfo.name}'s data will be erased.</Typography>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Button variant='contained' endIcon={<AiFillDelete />} color='error' onClick={deleteProduct}>Delete</Button>
                        <Button variant='contained' color='primary' onClick={() => setOpenAlert(false)} endIcon={<AiFillCloseCircle />}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </Container>
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    );
};

export default SingleProduct;
