import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { Transition } from '../../../Constants/Constant';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container,
    InputAdornment,
    TextField,
    Button,
    Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, MenuItem, FormControl, Select
} from '@mui/material';
import { MdOutlineCancel, MdProductionQuantityLimits } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AddProduct from '../AddProduct';
import styles from './productTable.css';

const ProductTable = ({ data, getProductInfo, seller, getSeller }) => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedSellerId, setSelectedSellerId] = useState('');
    const [selectedProductId, setSelectedProductId] = useState('');

    const columns = [
        {
            id: 'productName',
            label: 'Name',
            minWidth: 170,
            align: 'center',
        },
        {
            id: 'image',
            label: 'Image',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'description',
            label: 'Description',
            align: 'center',
            minWidth: 100
        },
        {
            id: 'price',
            label: 'Price',
            minWidth: 100,
            align: 'center',
        },
        {
            id: 'seller',
            label: 'Seller',
            minWidth: 100,
            align: 'center',
        },
    ];


    const handleClickOpen = (productId) => {
        setSelectedProductId(productId);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSellerId) {
            console.error('No seller selected');
            return;
        }
        try {
            const response = await axios.post(
                `http://localhost:8080/api/v1/sellers/${selectedSellerId}/products/${selectedProductId}`,{}, { withCredentials: true }
            );
            console.log('Seller assigned successfully:', response.data);
            handleClose();
            getProductInfo(); // Refresh the product list after assignment
        } catch (error) {
            console.error('Error assigning seller:', error);
        }
    };

    const handleOnchange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setSelectedSellerId(e.target.value);
    };

    const filterData = () => {
        if (searchTerm === '') {
            return data;
        }
        return data.filter(
            (item) =>
                (item.productName &&
                    item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.description &&
                    item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.price &&
                    item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.seller?.name &&
                    item.seller.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const newFilteredData = filterData();
        setFilteredData(newFilteredData);
    };

    useEffect(() => {
        setFilteredData(filterData());
    }, [data, searchTerm]);

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Search Products"
                    value={searchTerm}
                    onChange={handleSearch}
                    sx={{ width: { xs: 350, sm: 500, md: 800 }, }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>
            <AddProduct getProductInfo={getProductInfo} data={data} className="table-container"/>
            <Paper style={{ overflow: "auto", maxHeight: "500px" }}>
                <TableContainer sx={{ maxHeight: '500px' , position: 'relative' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead sx={{ position: 'sticky', top: 0 }}>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, color: "#1976d2", fontWeight: 'bold' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <h4> Product not found.</h4>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((prod) => (
                                    <TableRow key={prod.productId}>
                                        <TableCell component="th" scope="row" align="center">
                                            <Link to={`product/${prod.productId}`}>
                                                {prod.productName}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`product/${prod.productId}` }>
                                                <img src={prod.image} alt={prod.productName} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`product/${prod.productId}`}>
                                                {prod.description}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Link to={`product/${prod.productId}`}>
                                                ${prod.price}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">
                                            {prod.seller ? (
                                                <Link to={`seller/${prod.seller.id}`}>
                                                    {prod.seller.name}
                                                </Link>
                                            ) : (
                                                <Button className="blinking-button" onClick={() => handleClickOpen(prod.productId)}>
                                                    Add Seller
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose} keepMounted>
                    <DialogTitle sx={{ textAlign: "center", fontWeight: 'bold', color: "#1976d2" }}>
                        Assign Seller to Product
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Sellers</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedSellerId}
                                                label="Sellers"
                                                name='sellerId'
                                                onChange={handleOnchange}
                                            >
                                                {seller.map((sellerr) => (
                                                    <MenuItem value={sellerr.id} key={sellerr.id}>
                                                        {sellerr.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 2 }}>
                                    <Button fullWidth variant='contained' color='error' onClick={handleClose} endIcon={<MdOutlineCancel />}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" fullWidth variant="contained" endIcon={<MdProductionQuantityLimits />}>
                                        Add
                                    </Button>
                                </DialogActions>
                            </form>
                        </Box>
                    </DialogContent>
                </Dialog>
            </Paper>
        </>
    );
};

export default ProductTable;