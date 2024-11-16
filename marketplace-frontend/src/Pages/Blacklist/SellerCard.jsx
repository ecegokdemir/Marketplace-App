import React from 'react';
import { Card, CardActionArea, CardContent, CardActions, Button, Typography, Tooltip } from '@mui/material';
import { AiFillCloseCircle  } from 'react-icons/ai';
import styles from './SellerCard.module.css';

const SellerCard = ({ seller, addToBlacklist }) => {

    const handleAddToBlacklist = () => {
        addToBlacklist(seller);
    };

    return (
        <Card className={styles.card_container}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: 'center' }}>
                        {seller?.name.length > 20
                            ? seller?.name.slice(0, 20) + '...'
                            : seller?.name}
                    </Typography>
                    {/* Diğer seller bilgileri buraya eklenebilir */}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Tooltip title="Add to Blacklist">
                    <Button
                        sx={{ width: '100%' }}
                        variant="contained"
                        color="warning"
                        onClick={handleAddToBlacklist}
                        endIcon={<AiFillCloseCircle  />}
                    >
                        Block
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default SellerCard;
