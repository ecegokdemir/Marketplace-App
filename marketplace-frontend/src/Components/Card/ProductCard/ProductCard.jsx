import { Card, CardActionArea, CardActions, Rating, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ProductCard.module.css'

export default function ProductCard({ prod }) {
    //console.log(JSON.stringify(prod)+"product")
    return (
        <Card className={styles.main_card}>
            <CardActionArea className={styles.card_action}>
                <Box className={styles.cart_box}>
                    <img alt={prod.productName} src={prod.image} loading='lazy' className={styles.cart_img} />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {prod.productName.length > 20 ? prod.productName.slice(0, 20) + '...' : prod.productName}
                    </Typography>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {prod.description.length > 20 ? prod.description.slice(0, 20) + '...' : prod.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <Typography variant="h6" color="primary">
                    ${prod.price}
                </Typography>

            </CardActions>
        </Card >
    );
}