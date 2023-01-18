import connectMongo from '../../../database/conn';
import { getRecord, putRecord, deleteRecord } from '../../../database/controller';

export default async function handler(req, res) {
    connectMongo().catch(() => res.status(405).json({ error: "Error in the Connection"}))
    const { method } = req

    switch(method){
        case "GET":
            getRecord(req, res);
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