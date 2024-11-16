import './singlecategory.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios'
import Pagination from '@mui/material/Pagination';
import {
    InputAdornment,
    TextField,
    Container,
    Box,
    Button,
    MenuItem,
    FormControl,
    Select
} from '@mui/material'
import Loading from '../Components/loading/Loading'
import ProductCard from '../Components/Card/ProductCard/ProductCard'
import CopyRight from '../Components/CopyRight/CopyRight'
import SearchBar from '../Components/SearchBar/SearchBar'

const SingleCategory = () => {
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(4);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getCategoryProduct(currentPage);
        window.scroll(0, 0);
    }, [currentPage, searchTerm]);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage-1);
        getCategoryProduct(newPage-1);
    };


    const getCategoryProduct = async (page = 0) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`http://localhost:8080/api/v1/products?search=${searchTerm}&size=${pageSize}&page=${page}`, { withCredentials: true });
            setIsLoading(false);
            setProductData(data.payload);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    const filterData = () => {
        if (searchTerm === '') {
            return productData;
        }
        return productData.filter(
            (item) =>
                (item.productName && item.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.price && item.price.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (item.seller.name && item.seller.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        setFilteredData(filterData());
    }, [productData, searchTerm]);

    const loading = isLoading ? (
        <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: "center", flexWrap: "wrap", paddingLeft: 10, paddingBottom: 20 }}>
            <Loading /><Loading /><Loading /><Loading />
            <Loading /><Loading /><Loading /><Loading />
        </Container>
    ) : null;

    return (
        <>
            <Container maxWidth='xl' style={{ marginTop: 90, display: 'flex', justifyContent: "center", flexDirection: "column" }}>
                <Container style={{ marginTop: 90, display: "flex", justifyContent: 'center' }}>
                    <TextField
                        id="search"
                        type="search"
                        label="Search Products"
                        value={searchTerm}
                        onChange={handleSearch}
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
                {loading}
                <Container style={{ marginTop: 90, display: "flex", justifyContent: 'center' }}>
                    <SearchBar />
                </Container>
                <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20, marginBottom: 30, width: '100%' }}>
                    {filteredData.map(prod => (
                        <Link to={`/Detail/${prod.productId}`} key={prod.productId}>
                            <ProductCard prod={prod} />
                        </Link>
                    ))}
                </Container>
                <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage+1}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Container>
            </Container>
            <CopyRight sx={{ mt: 8, mb: 10 }} />
        </>
    );
}

export default SingleCategory;
