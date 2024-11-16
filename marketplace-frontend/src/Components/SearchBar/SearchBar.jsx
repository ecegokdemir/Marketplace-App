import { Container, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useState ,axios} from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { getAllProducts } from "../../Constants/Constant";
const SearchBar = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getAllProducts(setData);
    }, [])

    const handleSearch = async (event) => {
        const searchValue = event.target.value;
        setSearchTerm(searchValue);

        console.log('Search value:', searchValue);

        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/products`, {
                params: {
                    search: searchValue,
                    size: 50,
                    page: 0
                },
                withCredentials: true // Eğer kimlik doğrulama bilgileri gerekliyse
            });
            console.log('Search value:', searchValue);  console.log('Search value:', searchValue);
            console.log('Filtered data:', data);
            // Veri ve filtrelenmiş veriyi güncelle
            setData(data);
            setFilteredData(data); // Burada `data` zaten filtrelenmiş olmalı

        } catch (error) {
            console.error('Error fetching data:', error);
        }


        const Item = styled(Paper)(({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        }));
        return (
            <Container style={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 5 }}>
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
                {
                    searchTerm.length > 0 &&
                    <Box sx={{ width: { xs: 350, sm: 500, md: 800 }, overflowY: "scroll", height: "200px" }}>
                        <Stack spacing={0}>

                            {filteredData.length === 0 ?
                                <Typography variant="h6" textAlign="center" margin="25px 0">Product Not Found</Typography>
                                : filteredData.map(products => (
                                    <Link to={`/Detail/${products.productId}`} key={products.productId}>
                                        <Item sx={{ borderRadius: 0, display: 'flex', justifyContent: 'space-between', padding: "2px 15px", alignItems: 'center' }}>
                                            <Typography variant="body2"> {products.name.slice(0, 35)}</Typography>
                                            <img src={products.image} alt={products.name} style={{ width: 55, height: 65 }} />
                                        </Item>
                                    </Link>
                                ))}
                        </Stack>
                    </Box>
                }
            </Container >
        )
    }
}

    export default SearchBar