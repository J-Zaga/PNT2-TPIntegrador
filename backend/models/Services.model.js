import mongoose from "mongoose"

const servicesSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    categoria:{
        type: String,
        required: true,
        trim: true
    },
    precio:{
        type: Number,
        required: true,
        trim: true
    },
    fechaDeCompra:{
    type: Date,
    required: false,
    default:null
    }
})

const Services = mongoose.model('Services', servicesSchema)
export default Services