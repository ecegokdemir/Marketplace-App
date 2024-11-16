import React, { useState, useEffect } from 'react'
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, InputLabel, MenuItem, FormControl, Select,
} from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Transition } from '../../Constants/Constant';
import { MdOutlineCancel, MdProductionQuantityLimits } from 'react-icons/md';
import UploadWidget from '../../Widget/UploadWidget';

const AddProduct = ({ getProductInfo, data }) => {
    const [images, setImages] = useState([]);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const [productInfo, setProductInfo] = useState({
        productName: "",
        image: "",
        price: "",
        category: "",
        description: "",
    });

    const handleOnchange = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setProductInfo({
            productName: "",
            image: "",
            price: "",
            category: "",
            description: "",
        });
        setImages([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length > 0) {
            try {
                if (!productInfo.productName|| !productInfo.price || !productInfo.category || !productInfo.description) {
                    toast.error("Please Fill all Fields", { autoClose: 500, theme: 'colored' });
                } else {
                    const { data } = await axios.post(
                        `http://localhost:8080/api/v1/products?categoryId=${productInfo.category}`,
                        {
                            productName: productInfo.productName,
                            description: productInfo.description,
                            price: productInfo.price,
                            image: images[0],
                        },
                        { withCredentials: true }
                    );
                    setOpen(false);
                    if (data.code === 10000) {
                        getProductInfo();
                        toast.success("Product added successfully", { autoClose: 500, theme: 'colored' });
                        handleClose(); // This will clear the state as well
                    } else {
                        toast.error("Something went wrong", { autoClose: 500, theme: 'colored' });
                    }
                }
            } catch (error) {
                toast.error(error.response.data.error, { autoClose: 500, theme: 'colored' });
            }
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/categories?search=&size=50&page=0", { withCredentials: true });
                setCategories(response.data.payload);
            } catch (error) {
                toast.error("Failed to fetch categories", { autoClose: 500, theme: 'colored' });
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', margin: "20px 0" }}>
                <Typography variant='h6' textAlign='center' color="#1976d2" fontWeight="bold">Add new product</Typography>
                <Button variant='contained' endIcon={<MdProductionQuantityLimits />} onClick={handleClickOpen}>Add</Button>
            </Box>
            <Divider sx={{ mb: 5 }} />
            <Dialog
                open={open}
                onClose={handleClose}
                keepMounted
                TransitionComponent={Transition}
            >
                <DialogTitle sx={{ textAlign: "center", fontWeight: 'bold', color: "#1976d2" }}>Add new product</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2 }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField label="Name" name='productName' value={productInfo.productName} onChange={handleOnchange} variant="outlined" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={productInfo.category}
                                            label="Categories"
                                            name='category'
                                            onChange={handleOnchange}
                                        >
                                            {categories.map((category) => (
                                                <MenuItem value={category.categoryId} key={category.categoryId}>
                                                    {category.categoryName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid xs={12}>
                                    {images.map((image, index) => (
                                        <img src={image} key={index} alt="" />
                                    ))}
                                    <UploadWidget
                                        uwConfig={{
                                            multiple: false,
                                            cloudName: "lamadev",
                                            uploadPreset: "estate",
                                            folder: "posts",
                                        }}
                                        setState={setImages}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField label="Price" name='price' value={productInfo.price} onChange={handleOnchange} variant="outlined" inputMode='numeric' fullWidth />
                                </Grid>
                                <Grid item xs={12} sx={{ margin: "10px auto" }}>
                                    <TextField
                                        id="filled-textarea"
                                        value={productInfo.description} onChange={handleOnchange}
                                        label="Description"
                                        multiline
                                        sx={{ width: "100%" }}
                                        variant="outlined"
                                        name='description'
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 2 }}>
                                <Button fullWidth variant='contained' type='reset' color='error' onClick={handleClose} endIcon={<MdOutlineCancel />}>Cancel</Button>
                                <Button type="submit" fullWidth variant="contained" endIcon={<MdProductionQuantityLimits />}>Add</Button>
                            </DialogActions>
                        </form>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddProduct;
