import React from 'react';
import { Button, Card, CardContent, Typography, CardActions, Tooltip } from '@mui/material';
import { AiFillDelete } from 'react-icons/ai';
import styles from '../../Components/Card/CartCard/CartCard.module.css'; // Stil dosyanızı import edin

const BlackListCard = ({ seller, removeFromBlacklist }) => {
    return (
        <Card className={styles.main_card}>
            <CardContent>
                <Typography gutterBottom variant="h6">
                    {seller?.name.length > 20 ? seller?.name.slice(0, 20) + '...' : seller?.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Tooltip title='Remove from Blacklist'>
                    <Button 
                        variant='contained' 
                        color='error' 
                        onClick={() => removeFromBlacklist(seller.id)}
                    >
                        <AiFillDelete />
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default BlackListCard;