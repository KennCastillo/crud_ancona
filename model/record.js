import { Schema, models, model } from 'mongoose';

const recordSchema = new Schema({
    sku: String,
    name: String,
    desc: String,
    shortDesc: String,
    image: String,
    category: String,
    price: Number,
    brand: String,
    partNumber: String,
    family: String,
    engine: String,
    provider: String,
    status: String
})

const Records = models.record || model('record', recordSchema)
export default Records;