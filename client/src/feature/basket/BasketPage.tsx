import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import agent from '../../app/api/agent'
import Loading from '../../app/layout/Loading'
import { Basket } from '../../app/models/basket'

export default function BasketPage() {
    const [loading,setLoading] = useState(true)
    const [basket,setBasket] = useState<Basket|null>(null)

    useEffect(()=>{
        agent.Basket.get()
        .then((basket)=>setBasket(basket))
        .catch(error=>console.error(error))
        .finally(()=>setLoading(false))
        setLoading(true)    
    },[])

    if (loading) return <Loading message='loading basket...'/>
    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <div>buyer id = {basket.buyerId}</div>
    )
}
