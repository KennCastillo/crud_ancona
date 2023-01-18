import connectMongo from '../../../database/conn';
import { getRecords, postRecord, putRecord, deleteRecord } from '../../../database/controller';

export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection"}))

    // type of request
    const { method } = req

    switch(method){
        case 'GET' :
            getRecords(req, res)
            break;
        case 'POST':
           postRecord(req, res)
            break;
        case 'PUT':
            putRecord(req, res)
            break;
        case 'DELETE':
            deleteRecord(req, res)
            break;
        default : 
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`)
            break;
    }
  }