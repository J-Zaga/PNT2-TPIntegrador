import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from 'cors'
import { db } from "./config/db.js"
import servicesRoutes from "./routes/servicesRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())

db()

//el undefined está por el uso del postman, pero no es ideal tenerlo allí
const whitelist = [process.env.FRONTEND_URL, undefined]

const corsOptions = {
    origin: function(origin, callback){
        if(whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

app.use("/servicios", servicesRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(colors.blue("El servidor se está ejecutando en el puerto: ", colors.blue.bold(PORT)))
})

console.log(process.env.MONGO_URI)