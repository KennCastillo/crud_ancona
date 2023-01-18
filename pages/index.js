import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Form from '../components/form';

import TableUI from '../components/table';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, deleteAction } from '../redux/reducer';
import { deleteRecord, getRecords } from '../lib/helper';
import { useQueryClient } from 'react-query';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const visible = useSelector((state) => state.app.client.toggleForm)
  const deleteId = useSelector(state => state.app.client.deleteId)
  const queryClient = useQueryClient();

  const dispatch = useDispatch()

  const handler = () => {
    dispatch(toggleChangeAction())
  }

  const deleteHandler = async () => {
    if(deleteId){
      await deleteRecord(deleteId);
      await queryClient.prefetchQuery('records', getRecords)
      await dispatch(deleteAction(null))
    }    
  }

  const cancelHandler = async () => {
     console.log("cancelar")
     await dispatch(deleteAction(null))
  }

  return (
    
    <section>
      <Head>
        <title>CRUD Ancona</title>
        <meta name="Lorem" content="Lorem" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      
      <main className="py-5">
        <h1 className="text-xl md:text-5xl text-center font-bold py-10">Gestion de articulos</h1>
        
        <Button onClick={handler} variant="contained">Nuevo articulo</Button>
        
        {deleteId ? DeleteComponent({deleteHandler, cancelHandler}) : <></>}

        <br/>
        <br/>
        { visible ? <Form></Form> : <></> }

        <TableUI></TableUI>
      </main>
      </section>
    
  )
}

function DeleteComponent({deleteHandler, cancelHandler}){
  return(
    <Stack spacing={2} direction="row">
      <p>¿Estas seguro de eliminar el registro?</p>
      <Button variant="contained" onClick={deleteHandler}>Si</Button>
      <Button variant="outlined" onClick={cancelHandler}>No</Button>
    </Stack>
  )
}