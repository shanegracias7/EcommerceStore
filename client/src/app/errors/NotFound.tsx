import { Button, Container,Divider,Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container component={Paper} sx={{height:20}}>
        <Typography gutterBottom variant='h3'>oops!could not find what you were looking for.</Typography>
        <Divider/>
        <Button fullWidth component={Link} to={'/catalog'} >back</Button>
    </Container>
  )
}
