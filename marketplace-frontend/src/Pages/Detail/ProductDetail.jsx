import './Productsimilar.css'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    Tooltip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Skeleton,
} from '@mui/material';
import { AiFillHeart, AiFillCloseCircle, AiOutlineLogin } from 'react-icons/ai'
import axios from 'axios';
import { toast } from 'react-toastify';
import { ContextFunction } from '../../Context/Context';
import { Transition, getSingleProduct } from '../../Constants/Constant';
import CopyRight from '../../Components/CopyRight/CopyRight';

const ProductDetail = () => {
    const { wishlistData, setWishlistData } = useContext(ContextFunction)
    const [openAlert, setOpenAlert] = useState(false);
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true);
    let isAdmin = localStorage.getItem('isAdmin');

    useEffect(() => {
        getSingleProduct(setProduct, id, setLoading)
        window.scroll(0, 0)
    }, [id])

    const addToWhishList = async (product) => {
        console.log(product.productId)
        try {
            const { data } = await axios.post(`http://localhost:8080/api/v1/favorites/${product.productId}`,{},{
                withCredentials: true
            })
            setWishlistData(data)
            setWishlistData([...wishlistData, product])
            toast.success("Added To Wishlist", { autoClose: 500, theme: 'colored' })
        } catch (error) {
            toast.error(error.response.data.msg, { autoClose: 500, theme: 'colored' })
        }
    };

    return (
        <>
            <Container maxWidth='xl'>
                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setOpenAlert(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                        <DialogContentText style={{ textAlign: 'center' }} id="alert-dialog-slide-description">
                            Please Login To Proceed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to="/login">
                            <Button variant='contained' endIcon={<AiOutlineLogin />} color='primary'>Login</Button>
                        </Link>
                        <Button variant='contained' color='error' onClick={() => setOpenAlert(false)} endIcon={<AiFillCloseCircle />}>Close</Button>
                    </DialogActions>
                </Dialog>

                <main className='main-content'>
                    {loading ? (
                        <Skeleton variant='rectangular' height={400} />
                    ) : (
                        <div className="product-image">
                            <div className='detail-img-box'>
                                <img alt={product.name} src={product.image} className='detail-img' />
                                <br />
                            </div>
                        </div>
                    )}
                    {loading ? (
                        <section style={{ display: 'flex', flexWrap: "wrap", width: "100%", justifyContent: "space-around", alignItems: 'center' }}>
                            <Skeleton variant='rectangular' height={200} width="200px" />
                            <Skeleton variant='text' height={400} width={700} />
                        </section>
                    ) : (
                        <section className='product-details'>  
                                <Typography
                                    sx={{
                                        backgroundColor: '#fafafa',
                                        padding: 2,
                                        borderRadius: 1,
                                     
                                    }}
                                >
                                    <span style={{  fontWeight: 'bold' }} >Name: </span>{product.productName}
                                </Typography>
                                <Typography
                                    sx={{
                                        backgroundColor: '#f5f5f5',
                                        padding: 2,
                                        borderRadius: 1,
                                    
                                    }}
                                >
                                     <span style={{  fontWeight: 'bold' }} >Description: </span> {product.description}
                                </Typography>
                                <div style={{ display: 'flex', gap: 20 }}>
                                    <Typography
                                      variant='body1'
                                        sx={{
                                            backgroundColor: '#e8f5e9',
                                            padding: 2,
                                            borderRadius: 1,
                                        }}
                                    >
                                       <span style={{  fontWeight: 'bold' }} >Price: $ </span> {product.price}
                                    </Typography>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                                    <Typography
                                        variant='body1'
                                        sx={{
                                            backgroundColor: '#f0f4f8',
                                            padding: 2,
                                            borderRadius: 1,
                                        }}
                                    >
                                         <span style={{  fontWeight: 'bold' }} >Seller:</span> {product.seller?.name}
                                    </Typography>
                                    { isAdmin ==="false" && (
                                        <div style={{ display: 'flex' }}>
                                            <Tooltip title='Add To Wishlist'>
                                                <Button size='small' variant='contained' className='all-btn' onClick={() => addToWhishList(product)}>
                                                    <AiFillHeart fontSize={21} />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    )}
                                </div>
                            </section>
                    )}
                </main>
                <CopyRight sx={{ mt: 8, mb: 10 }} />
            </Container>
        </>
    )
}

export default ProductDetail
