import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, Typography, Box, useMediaQuery, Grid , Button } from '@mui/material';
import UserTable from './Tables/UserTable';
import SellerTable from './Tables/SellerTable';
import axios from 'axios';
import ProductTable from './Tables/ProductTable';
import { VscGraph } from 'react-icons/vsc'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineShoppingCart, AiFillAppstore } from 'react-icons/ai'
import { FaPeopleCarry, FaAppStore } from 'react-icons/fa'
import Widget from './Widget';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}

        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography >{children} </Typography>

                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs({ user, setUser, getUser, seller, getSeller }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [value, setValue] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProductInfo();
    }, [])

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            getProductInfo(newPage);
        }
    };

    const getProductInfo = async (page = 0, size = 5) => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products/admin?search=&size=${size}&page=${page}`, {
                withCredentials: true
            });
            setProducts(data.payload);
            console.log(data.payload)
            console.log(data)
            setTotalPages(data.totalPages);  // Total pages bilgisi
            setCurrentPage(page);  // Mevcut sayfa bilgisi
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const isSmallScreen = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} direction={isSmallScreen ? 'column' : 'row'} padding={1}>
                {/* <Grid item xs={12} sm={6} md={6} lg={3}>
                    <Widget numbers={totalRevenue} heading='Revenue' color='#9932CC' icon={<TbReportMoney />} />
                </Grid> */}


                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Widget numbers={seller.length} heading='Sellers' color='#FFC300  ' icon={<AiFillAppstore />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Widget numbers={user.length} heading='Users' color='#FF69B4' icon={<CgProfile />} />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                    <Widget numbers={products.length} heading='Products' color='#1f77b4' icon={<AiOutlineShoppingCart />} />
                </Grid>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" style={{ overflowX: "a" }} >
                    {/* <Tab label={!isSmallScreen && 'Statistics'}  {...a11yProps(0)} iconPosition='start' icon={<VscGraph fontSize={20} />} /> */}

                    <Tab label={!isSmallScreen && "Sellers"} {...a11yProps(2)} iconPosition='start' icon={<AiFillAppstore fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Users"} {...a11yProps(1)} iconPosition='start' icon={<CgProfile fontSize={20} />} />
                    <Tab label={!isSmallScreen && "Products"} {...a11yProps(3)} iconPosition='start' icon={<AiOutlineShoppingCart fontSize={20} />} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={1}>
                <UserTable user={user} getUser={getUser} />
            </TabPanel>
            <TabPanel value={value} index={0} >
                <SellerTable seller={seller} getSeller={getSeller} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProductTable data={products} getProductInfo={getProductInfo} seller={seller} getSeller={getSeller} />
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                    >
                        Previous
                    </Button>
                    <Typography margin="0 16px">Page {currentPage + 1} of {totalPages}</Typography>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                    </Button>
                </Box>
            </TabPanel>
        </Box >
    );
}