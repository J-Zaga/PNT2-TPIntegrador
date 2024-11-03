import dotenv from "dotenv"
import { db } from "../config/db.js"
import Services from "../models/Services.model.js"
import { servicios } from "./services.js"
import colors from "colors"

dotenv.config()

await db()

async function seedBD(){
    try{
        await Services.insertMany(servicios)
        console.log(colors.green.bold("Se agregaron los datos correctamente"))
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

async function clearBD(){
    try{
        await Services.deleteMany()
        console.log(colors.red.bold("Se eliminaron los datos correctamente"))
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === "--import"){
    seedBD()
}else{
    clearBD()
}