import { Button, Card, CardActionArea, CardActions, CardContent, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import styles from './CartCard.module.css';

const CartCard = ({ product, removeFromCart }) => {

    return (
        <div className={styles.card_container}>
            <Card className={styles.main_cart}>
                <Link to={`/Detail/${product?.productId}`}>
                    <CardActionArea className={styles.card_action}>
                        <Box className={styles.img_box}>
                            <img 
                                alt={product?.productName} 
                                loading='lazy' 
                                src={product?.image} 
                                className={styles.img} 
                            />
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                                {product?.productName.length > 20 
                                    ? product?.productName.slice(0, 20) + '...' 
                                    : product?.productName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ textAlign: "center", marginBottom: 1 }}>
                                {product?.description.length > 50 
                                    ? product?.description.slice(0, 50) + '...' 
                                    : product?.description}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    '& > *': {
                                        m: 1,
                                    },
                                }}
                            >
                                <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                                    ${product?.price}
                                </Typography>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Tooltip title='Remove from Wishlist'>
                        <Button 
                            className='all-btn' 
                            sx={{ width: 10, borderRadius: '30px' }} 
                            variant='contained' 
                            color='error' 
                            onClick={() => removeFromCart(product)}
                        >
                            <AiFillDelete style={{ fontSize: 15 }} />
                        </Button>
                    </Tooltip>
                </CardActions>
            </Card>
        </div>
    );
}

export default CartCard;