import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import { getRecords } from '../lib/helper'; 
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, updateAction, deleteAction  } from '../redux/reducer';

export default function TableUI() {

  const {isLoading, isError, data, error} = useQuery('records', getRecords)

  if(isLoading) return <div>Cargando...</div>
  if(isError) return <div>Ocurrio un error</div>

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className='backTitleColor'></TableCell>
              <TableCell className='backTitleColor'>SKU</TableCell>
              <TableCell className='backTitleColor' align="right">Nombre</TableCell>
              <TableCell className='backTitleColor' align="right">Descripción</TableCell>
              <TableCell className='backTitleColor' align="right">Desc. corta</TableCell>
              <TableCell className='backTitleColor' align="right">Categoría</TableCell>
              <TableCell className='backTitleColor' align="right">Precio</TableCell>
              <TableCell className='backTitleColor' align="right">Marca</TableCell>
              <TableCell className='backTitleColor' align="right">No. Parte</TableCell>
              <TableCell className='backTitleColor' align="right">Familia</TableCell>
              <TableCell className='backTitleColor' align="right">Motor</TableCell>
              <TableCell className='backTitleColor' align="right">Proveedor</TableCell>
              <TableCell className='backTitleColor' align="right">Estatus</TableCell>
              <TableCell className='backTitleColor' align="right">Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((obj, i) => <Tr {...obj} key={i} />)
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  function Tr({_id, sku, name, desc, shortDesc, image, category, price, brand, partNumber, family, engine, provider, status}){
   
    const visible = useSelector((state) => state.app.client.toggleForm)
    const dispatch = useDispatch();

    const onUpdate = () => {
      dispatch(toggleChangeAction(_id))

      if(visible){
        dispatch(updateAction(_id))
      }
    }

    const onDelete = () => {
      if(!visible){
        dispatch(deleteAction(_id))
      }
    }

    return(
        <TableRow         
          /* sx={{ '&:last-child td, &:last-child th': { border: 0 } }} */
        >
        <TableCell align="center"><Avatar>{image}</Avatar></TableCell>
        <TableCell align="th">{sku}</TableCell>        
        <TableCell align="right">{name}</TableCell>
        <TableCell align="right">{desc}</TableCell>
        <TableCell align="right">{shortDesc}</TableCell>
        <TableCell align="right">{category}</TableCell>
        <TableCell align="right">{price}</TableCell>
        <TableCell align="right">{brand}</TableCell>
        <TableCell align="right">{partNumber}</TableCell>
        <TableCell align="right">{family}</TableCell>
        <TableCell align="right">{engine}</TableCell>
        <TableCell align="right">{provider}</TableCell>
        <TableCell align="right"><Button
                                  color={status == "Activo" ? "success":"secondary"}
                                  disabled={status == "Activo" ? false : true}
                                  size="small"
                                  variant="contained"
                                >{status}</Button></TableCell>
        <TableCell align="right">
        <Stack spacing={2} direction="row">
          <IconButton
          color={"primary"}
          onClick={onUpdate}
        ><EditIcon />
        </IconButton>
        <IconButton
          onClick={onDelete}
        ><DeleteIcon />
        </IconButton>
        </Stack></TableCell>
      </TableRow>
      )
  }