import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import React from 'react'
import agent from '../../app/api/agent'

export default function AboutPage() {
  return (
    <Container>
      <Typography gutterBottom variant='h2'>errors for testing purose</Typography>
      <ButtonGroup fullWidth>
        <Button variant='contained' onClick={()=>agent.TestErrors.get400Error().catch((error)=>console.error(error))}>Test 400 error</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.get401Error().catch((error)=>console.error(error))}>Test 401 error</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.get404Error().catch((error)=>console.error(error))}>Test 404 error</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.get500Error().catch((error)=>console.error(error))}>Test 500 error</Button>
        <Button variant='contained' onClick={()=>agent.TestErrors.getValidationError().catch((error)=>console.error(error))}>Test validation error</Button>
      </ButtonGroup>
    </Container>
  )
}
