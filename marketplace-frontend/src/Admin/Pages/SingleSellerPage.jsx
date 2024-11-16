import axios from 'axios';
import React from 'react'
import SellerInfoItem from '../Components/UserData/SellerInfoItem.jsx';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import CopyRight from '../../Components/CopyRight/CopyRight';


const SingleSellerPage = () => {

    const { id } = useParams();
    
    return (
        <>
  
            <Container>
                <SellerInfoItem id={id} />
            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />

        </>
    )
}

export default SingleSellerPage