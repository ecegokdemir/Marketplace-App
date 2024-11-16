import axios from 'axios';
import React from 'react'
import UserInfoItem from '../Components/UserData/UserInfoItem';
import UserWishlistItem from '../Components/UserData/UserWishlistItem';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import CopyRight from '../../Components/CopyRight/CopyRight';


const SingleUserPage = () => {

    const { id } = useParams();

    return (
        <>

            <Container>
                <UserInfoItem id={id} />
            </Container >
            <CopyRight sx={{ mt: 8, mb: 10 }} />

        </>
    )
}

export default SingleUserPage