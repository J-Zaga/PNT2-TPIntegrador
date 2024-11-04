import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contraseña: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        enum: ['usuario', 'administrador', 'prestador'],
        default: 'usuario'
    },
    serviciosComprados: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }
    ],
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('User', userSchema)
export default User