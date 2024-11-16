import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Card,
    CardContent,
    Grid,
    IconButton,
    CardActions
} from '@mui/material';
import { AiOutlineSearch, AiFillAppstore, AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import AddSeller from '../AddSeller';

const SellerTable = ({ seller, getSeller }) => {
    const [loading, setLoading] = useState(true);
    const [expandedSeller, setExpandedSeller] = useState(null);
    const [products, setProducts] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSellers, setFilteredSellers] = useState([]);

    useEffect(() => {
        if (seller.length > 0) {
            setLoading(false);
        }
    }, [seller]);

    useEffect(() => {
        setFilteredSellers(filterSellers());
    }, [seller, searchTerm]);

    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 100,
            align: 'center',
        },
    ];

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        const newFilteredData = filterSellers();
        setFilteredSellers(newFilteredData);
    };

    const filterSellers = () => {
        if (searchTerm === '') {
            return seller;
        }
        return seller.filter(
            (item) =>
                item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const handleAccordionChange = (sellerId) => (event, isExpanded) => {
        setExpandedSeller(isExpanded ? sellerId : false);
        if (isExpanded && !products[sellerId]) {
            fetchProductsForSeller(sellerId);
        }
    };

    const fetchProductsForSeller = async (sellerId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/products/seller/${sellerId}?size=50&page=0&sort=id`, {
                withCredentials: true
            });
            setProducts((prev) => ({ ...prev, [sellerId]: response.data.payload }));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDeleteProduct = async (sellerId, productId) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/sellers/${sellerId}/remove-product/${productId}`, {}, {
                withCredentials: true
            });
            setProducts((prev) => ({
                ...prev,
                [sellerId]: prev[sellerId].filter(product => product.productId !== productId)
            }));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 5, marginTop: 5 }}>
                <TextField
                    id="search"
                    type="search"
                    label="Search Sellers"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    sx={{ width: { xs: 350, sm: 500, md: 800 } }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AiOutlineSearch />
                            </InputAdornment>
                        ),
                    }}
                />
            </Container>
            <AddSeller getSeller={getSeller} seller={seller} />
            <Paper style={{ overflow: "auto" }}>
                <TableContainer component={Paper} sx={{ maxHeight: '400px' }}>
                    <Table stickyHeader aria-label="sticky table">
                        {/* <TableHead sx={{ position: 'sticky', top: 0 }}>
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
                        </TableHead> */}
                        <TableBody>
                            {filteredSellers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length}>
                                        <div style={{ display: "flex", justifyContent: "center" }}>
                                            <h4>Seller not found.</h4>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredSellers.map((info) => (
                                    <React.Fragment key={info.id}>
                                        <TableRow>
                                            <TableCell component="th" scope="row" align="center">
                                                <Link to={`/seller/${info.id}`}>
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            fontSize: '1.1rem',
                                                            color: '#1976d2', 
                                                        }}
                                                    >
                                                        {info.name}
                                                    </Typography>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={columns.length}>
                                                <Accordion
                                                    expanded={expandedSeller === info.id}
                                                    onChange={handleAccordionChange(info.id)}
                                                >
                                                    <AccordionSummary expandIcon={<AiFillAppstore />}>
                                                        <Typography>View Products</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails
                                                        sx={{
                                                            border: '2px solid #1976d2',
                                                            borderRadius: '5px',
                                                            padding: '16px',
                                                        }}
                                                    >
                                                        {products[info.id] ? (
                                                            <Grid container spacing={2}>
                                                                {products[info.id].map((product) => (
                                                                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.productId}>
                                                                        <Card sx={{ maxWidth: 345, margin: 1 }}>
                                                                            <CardContent>
                                                                                <Typography variant="h6">{product.productName}</Typography>
                                                                                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                                                                                <Typography variant="body1" color="text.primary">{product.price}</Typography>
                                                                            </CardContent>
                                                                            <CardActions>
                                                                                <IconButton
                                                                                    aria-label="delete"
                                                                                    color="error"
                                                                                    onClick={() => handleDeleteProduct(info.id, product.productId)}
                                                                                >
                                                                                    <AiFillDelete />
                                                                                </IconButton>
                                                                            </CardActions>
                                                                        </Card>
                                                                    </Grid>
                                                                ))}
                                                            </Grid>
                                                        ) : (
                                                            <Typography>Loading products...</Typography>
                                                        )}
                                                    </AccordionDetails>
                                                </Accordion>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
};

export default SellerTable;
