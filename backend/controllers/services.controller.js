import Services from "../models/Services.model.js"
import { validateObjectId, handleNotFoundError } from "../utils/index.js"

const createService = async (req, res) => {
    if(Object.values(req.body).includes("")){
        const error = new Error("Todos los campos son obligatorios")

        return res.status(400).json({
            msg: error.message
        })
    }

    try{
        const service = new Services(req.body)
        const resultado = await service.save()
        res.json({
            msg: "El servicio se creó correctamente"
        })
    }catch(error){
        console.log(error)
    }
}

const getServices = async (req, res) => {
    try{
        const services = await Services.find()
        res.json(services)
    }catch(error){
        console.log(error)
    }
}

const getServiceById = async (req, res) => {
    const { id } = req.params

    if(validateObjectId(id, res)) return

    const service = await Services.findById(id)

    if(!service){
        return handleNotFoundError("El servicio no existe", res)
    }

    res.json(service)
}

const updateService = async (req, res) => {
    const { id } = req.params

    if(validateObjectId(id, res)) return

    const service = await Services.findById(id)

    if(!service){
        return handleNotFoundError("El servicio no existe", res)
    }

    service.nombre = req.body.nombre || service.nombre
    service.categoria =  req.body.categoria || service.categoria
    service.precio = req.body.precio || service.precio

    try{
        await service.save()
        res.json({
            msg: "El servicio se actualizó correctamente"
        })
    }catch(error){
        console.log(error)
    }
}

const deleteService = async (req, res) => {
    const { id } = req.params

    if(validateObjectId(id, res)) return

    const service = await Services.findById(id)

    if(!service){
        return handleNotFoundError("El servicio no existe", res)
    }

    try{
        await service.deleteOne()
        res.json({
            msg: "El servicio se eliminó correctamente"
        })
    }catch(error){
        console.log(error)
    }


}

export {
    getServiceById,
    createService,
    getServices,
    updateService,
    deleteService
}