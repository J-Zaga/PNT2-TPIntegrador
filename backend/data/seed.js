import dotenv from "dotenv"
import { db } from "../config/db.js"
import Services from "../models/Services.model.js"
import Users from "../models/Users.model.js" // Asegúrate de que el modelo de usuario está correctamente importado
import { servicios } from "./services.js"
import { usuarios } from "./users.js" // Asegúrate de definir tus datos de usuarios en este archivo
import colors from "colors"

dotenv.config()

await db()

async function seedServices() {
    try {
        await Services.insertMany(servicios)
        console.log(colors.green.bold("Se agregaron los servicios correctamente"))
    } catch (error) {
        console.log(error)
    }
}

async function clearServices() {
    try {
        await Services.deleteMany()
        console.log(colors.red.bold("Se eliminaron los servicios correctamente"))
    } catch (error) {
        console.log(error)
    }
}

async function seedUsers() {
    try {
        await Users.insertMany(usuarios)
        console.log(colors.green.bold("Se agregaron los usuarios correctamente"))
    } catch (error) {
        console.log(error)
    }
}

async function clearUsers() {
    try {
        await Users.deleteMany()
        console.log(colors.red.bold("Se eliminaron los usuarios correctamente"))
    } catch (error) {
        console.log(error)
    }
}

async function seedDB() {
    await seedServices()
    await seedUsers()
}

async function clearDB() {
    await clearServices()
    await clearUsers()
}

if (process.argv[2] === "--import") {
    await seedDB()
    process.exit(0)
} else {
    await clearDB()
    process.exit(0)
}