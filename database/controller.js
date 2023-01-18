import { read } from 'fs';
import Records from '../model/record';

export async function getRecords(req, res){
    
    try {
        
        const records = await Records.find({})
        console.log("Kenn");
        if(!records) return res.status(404).json({error:"Datos no econtrados"})
        res.status(200).json(records)
        
    } catch (error) {
        res.status(404).json({error:"Error al consultar la información"})    
    }
}


export async function getRecord(req, res){
    try {
        
        const {recordId} = req.query;
        
        if(recordId){
            const record = await Records.findById(recordId)
            res.status(200).json(record)
        }
        res.status(404).json({error:"Registro no seleccionado"})
        
    } catch (error) {
        res.status(404).json({error:"Error al obtener el registro"})    
    }
}

export async function postRecord(req, res){
    try{
        const formData = req.body;
        console.log(formData)
        if(!formData) return res.status(404).json({error:"Form data not provider..."})
        Records.create(formData, function(err, data){
            return res.status(200).json(data)
        })
    }catch(error){
        return res.status(404).json({error})
    }
}

export async function putRecord(req, res){
    try {
        
        const { recordId } = req.query;
        const formData = req.body;

        if(recordId && formData){
            const record = await Records.findByIdAndUpdate(recordId, formData);
            res.status(200).json(record)
        }
        res.status(404).json({error: "No ha seleccionado un registro"})
    } catch (error) {
        res.status(404).json({error: "Error al consultar la información"})
    }
}

export async function deleteRecord(req, res){
    try {
        const { recordId } = req.query;

        if(recordId){
            const record = await Records.findByIdAndDelete(recordId)
            return res.status(200).json(record)
        }
        res.status(404).json({error: "Registro no seleccionado"})

    } catch (error) {
        res.status(404).json({error: "Error al consultar la información"})
    }
}