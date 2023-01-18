const MONGO_URI = "mongodb+srv://kenn:hola.1234@crudancona.ikw60zg.mongodb.net/?retryWrites=true&w=majority"
import mongoose from 'mongoose';

const connectMongo = async () => {
    try{
        //const { connection } = await mongoose.connect(process.env.MONGO_URI)
        const { connection } = await mongoose.connect(MONGO_URI)

        if(connection.readyState == 1) {
            console.log("Conectado a la base de datos")
        }

    }catch(errors){
        return Promise.reject(errors)
    }
}

export default connectMongo;