import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Typography variant='h6'>STORE</Typography>
        </Toolbar>
    </AppBar>
  )
}
