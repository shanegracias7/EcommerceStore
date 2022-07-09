import { Add, Delete, Remove } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab';
import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { stat } from 'fs';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from './basketSlice';
import BasketSummary from './BasketSummary';

export default function BasketPage() {
    const {basket,status} =useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch()




    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} >
                    <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {basket.items.map(item => (
                        <TableRow
                        key={item.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            <Box display='flex' alignItems='center'>
                                <img src={item.pictureURL} alt={item.name} style={{height:50 ,marginRight:20}}/>
                                {item.name}
                            </Box>
                        </TableCell>
                        <TableCell align="right">${(item.price/100).toFixed(2)}</TableCell>
                        <TableCell align="center">
                            <LoadingButton loading={status.includes('PendingRemoveItem'+item.productId)} color='error' onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId}))}>
                                <Remove/>
                            </LoadingButton>
                            {item.quantity}
                            <LoadingButton loading={status.includes('PendingAddItem'+item.productId)} color='secondary' onClick={()=>dispatch(addBasketItemAsync({productId:item.productId}))}>
                                <Add/>
                            </LoadingButton>
                        </TableCell>
                        <TableCell align="right">${(item.price*item.quantity/100).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <LoadingButton loading={status.includes('PendingRemoveItem'+item.productId)} color='error' onClick={()=>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity}))}>
                                <Delete/>
                            </LoadingButton >
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <BasketSummary/>
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        fullWidth
                        size='large'
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </> 
    )
}
