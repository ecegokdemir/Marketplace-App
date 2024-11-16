import { Slide } from "@mui/material";
import axios from "axios";
import { forwardRef } from "react";

const getWishList = async (setProceed, setWishlistData, authToken) => {
    if (setProceed) {
        const { data } = await axios.get("http://localhost:8080/api/v1/favorites",{
            withCredentials: true 
        })
        setWishlistData(data)
    }
}
const handleLogOut = (setProceed, toast, navigate, setOpenAlert) => {
    if (setProceed) {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('isAdmin')
        toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
        navigate('/')
        setOpenAlert(false)
    }
    else {
        toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
}

const handleClickOpen = (setOpenAlert) => {
    setOpenAlert(true);
};

const handleClose = (setOpenAlert) => {
    setOpenAlert(false);
};

const getAllProducts = async (setData) => {
    try {
        const { data } = await axios.get("http://localhost:8080/api/v1/products?search=&size=5&page=0",  {
            withCredentials: true 
        });
        setData(data)

    } catch (error) {
        console.log(error);
    }
}


const getSingleProduct = async (setProduct, productId, setLoading) => {
    const { data } = await axios.get(`http://localhost:8080/api/v1/products/${productId}`,  {
        withCredentials: true 
    });
    setProduct(data.payload)
    setLoading(false);

}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});





export { getWishList, handleClickOpen, handleClose, handleLogOut, getAllProducts, getSingleProduct, Transition }