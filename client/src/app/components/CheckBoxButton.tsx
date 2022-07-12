import { FormGroup, FormLabel, FormControlLabel, Checkbox } from '@mui/material'
import React, { useState } from 'react'

interface Props{
    onChange: (item:string[])=>void;
    title:string;
    items:string[];
    checked?:string[];
}

export default function CheckBoxButton({onChange,title,items,checked}:Props) {

    const [checkedItems,setCheckedItems] = useState(checked||[])

    function handleChecked(value:string){
        const currentIndex =checkedItems.findIndex(item=>item === value)
        let newChecekedItem :string[]=[]
        if(currentIndex === -1) newChecekedItem = [...checkedItems,value]
        else newChecekedItem = checkedItems.filter(item=>item !== value)
        setCheckedItems(newChecekedItem)
        onChange(newChecekedItem)
    }

    return (
        <FormGroup>
            <FormLabel>{title }</FormLabel>
            {items.map((item,index)=>
                <FormControlLabel 
                    control={<Checkbox
                        checked={checkedItems.indexOf(item)!==-1}
                        onClick={()=>handleChecked(item)}
                          />} 
                    label={item} 
                    key={index}
                />
            )}
        </FormGroup>
    )
}
