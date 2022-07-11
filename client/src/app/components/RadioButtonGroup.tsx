import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'

interface Props{
    options:any[];
    onChange:(event:any)=>void;
    selectedValue:string;
    title:string;
}

export default function RadioButtonGroup({options,onChange,selectedValue,title}:Props) {
  return (
    <FormControl component='fieldset'>
        <FormLabel>{title}</FormLabel>
        <RadioGroup onChange={onChange} value={selectedValue}>
            {options.map(({value,label})=><FormControlLabel value={value} control={<Radio />} label={label} key={value}/> )}
        </RadioGroup>
    </FormControl>
    
  )
}
