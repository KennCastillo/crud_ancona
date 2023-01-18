import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useReducer } from "react";
import { ObjectFlags } from 'typescript';
import Success from './success';
import Bug from "./bug";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getRecord, getRecords, updateRecord } from '../lib/helper';


export default function UpdateRegistry({formId, formData, setFormData}) {

    const queryClient = useQueryClient()
    const {isLoading, isError, data, error} = useQuery(['records', formId], () => getRecord(formId))
    const UpdateMutation = useMutation((newData)=>updateRecord(formId, newData),{
        onSuccess: async(data)=>{
            //queryClient.setQueryData('records',(old) => (data))
            queryClient.prefetchQuery('records', getRecords)
        }
    })

    if(isLoading) return <div>Cargando...</div>
    if(isError) return <div>Error</div>

    const { sku, name, desc, shortDesc, image, category, price, brand, partNumber, family, engine, provider, status } = data;
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let updated = Object.assign({}, data, formData)
        console.log(updated)
        await UpdateMutation.mutate(updated)
    }    

    return(
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
                > 
                <br/>
            <TextField name="sku"  onChange={setFormData} defaultValue={sku} label="Outlined" variant="outlined" placeholder='SKU' />
            <TextField name="name" onChange={setFormData} defaultValue={name}  label="Outlined" variant="outlined" placeholder='Nombre' />
            <TextField name="desc" onChange={setFormData} defaultValue={desc}  label="Outlined" variant="outlined" placeholder='Descripción' />
            <TextField name="shortDesc" onChange={setFormData} defaultValue={shortDesc}  label="Outlined" variant="outlined" placeholder='Descripción corta' />
            <TextField name="image"  onChange={setFormData} defaultValue={image}  label="Outlined" variant="outlined" placeholder='Imagen' />
            <TextField name="category"  onChange={setFormData} defaultValue={category} label="Outlined" variant="outlined" placeholder='Categoria' />
            <TextField name="price" onChange={setFormData} defaultValue={price}  label="Outlined" variant="outlined" placeholder='Precio' />
            <TextField name="brand" onChange={setFormData} defaultValue={brand}  label="Outlined" variant="outlined" placeholder='Marca' />
            <TextField name="partNumber" onChange={setFormData}  defaultValue={partNumber} label="Outlined" variant="outlined" placeholder='N. parte' />
            <TextField name="family"  onChange={setFormData} defaultValue={family}  label="Outlined" variant="outlined" placeholder='Familia' />
            <TextField name="engine" onChange={setFormData} defaultValue={engine}  label="Outlined" variant="outlined" placeholder='Motor' />
            <TextField name="provider" onChange={setFormData} defaultValue={provider}  label="Outlined" variant="outlined" placeholder='Proveedor' />
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    onChange={setFormData}    
                    defaultValue={status == "Activo" ? "Activo" : "Inactivo"}                
                >
                    <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                    <FormControlLabel value="Inactivo"  control={<Radio />} label="Inactivo" />                    
                </RadioGroup>
            </FormControl>
            <Button variant="contained" type="submit" color="success">Actualizar</Button>
            <br/>
            </Box>
            
    )
}