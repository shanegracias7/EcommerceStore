import { Button, Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export default function Servererror() {
  
  const history = useHistory()
  const {state} = useLocation<any>()
  return (
    <Container component={Paper}>
      {state?.error ?(
      <>
        <Typography variant='h2'>{state.error.title}</Typography>
        <Typography>{state.error.detail ||'internal server error'}</Typography>
      </>
      ):(<Typography variant='h5' gutterBottom>Server error</Typography>)
      }
      <Button onClick={()=>history.push('/catalog')}>go to back to store</Button>
      
    </Container>
  )
}
