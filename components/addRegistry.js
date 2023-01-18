import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

import { useReducer } from "react";
import Success from './success';
import Bug from "./bug"
import { useQueryClient, useMutation } from 'react-query';
import { addRecord, getRecords } from '../lib/helper';

export default function AddRegistry({formData, setFormData}) {

    const queryClient = useQueryClient()

    const addMutation = useMutation(addRecord, {
        onSuccess:() => {
            queryClient.prefetchQuery('records',getRecords)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(Object.keys(formData).length == 0) return console.log("Capture la información necesaria")
        
        let {sku,
            name,
            desc,
            shortDesc,
            image,
            category,
            price,
            brand,
            partNumber,
            family,
            engine,
            provider,
            status} = formData;

        const model = {
            sku,
            name,
            desc,
            shortDesc,
            //image: `${Math.floor(Math.random()*10)}`,
            image,
            category,
            price,
            brand,
            partNumber,
            family,
            engine,
            provider,
            status
        }

        addMutation.mutate(model)
    }

    //if (Object.keys(formData).length > 0) return <SuccessModal message={"Guardado con éxito"}></SuccessModal>
    if(addMutation.isLoading) return <div>Cargando...</div>
    if(addMutation.isError) return <Bug message={addMutation.error.message}/>
    if(addMutation.isSucccess) return <Success message={"Agregado correctamente"}/>

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
            <TextField name="sku"  onChange={setFormData} label="SKU" variant="outlined" placeholder='SKU' />
            <TextField name="name" onChange={setFormData}  label="Nombre" variant="outlined" placeholder='Nombre' />
            <TextField name="desc" onChange={setFormData}  label="Descripción" variant="outlined" placeholder='Descripción' />
            <TextField name="shortDesc" onChange={setFormData}  label="Descripción corta" variant="outlined" placeholder='Descripción corta' />
            <TextField name="image"  onChange={setFormData} label="Imagen" variant="outlined" placeholder='Imagen' />
            <TextField name="category"  onChange={setFormData} label="Categoria" variant="outlined" placeholder='Categoria' />
            <TextField name="price" onChange={setFormData}  label="Precio" variant="outlined" placeholder='Precio' />
            <TextField name="brand" onChange={setFormData}  label="Marca" variant="outlined" placeholder='Marca' />
            <TextField name="partNumber" onChange={setFormData}  label="N. parte" variant="outlined" placeholder='N. parte' />
            <TextField name="family"  onChange={setFormData} label="Familia" variant="outlined" placeholder='Familia' />
            <TextField name="engine" onChange={setFormData}  label="Motor" variant="outlined" placeholder='Motor' />
            <TextField name="provider" onChange={setFormData}  label="Proveedor" variant="outlined" placeholder='Proveedor' />
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    onChange={setFormData}
                >
                    <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                    <FormControlLabel value="Inactivo" control={<Radio />} label="Inactivo" />                    
                </RadioGroup>
                </FormControl>
            <Button variant="contained" type="submit" color="success">Agregar</Button>
            <br/>
            </Box>
            
    )
}