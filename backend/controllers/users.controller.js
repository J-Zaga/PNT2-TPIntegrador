import User from "../models/Users.model.js"
import { validateObjectId, handleNotFoundError } from "../utils/index.js"

const createUser = async (req, res) => {
    if (Object.values(req.body).includes("")) {
        const error = new Error("Todos los campos son obligatorios")

        return res.status(400).json({
            msg: error.message
        })
    }

    try {
        const user = new User(req.body)
        await user.save()
        res.json({
            msg: "El usuario se creó correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al crear el usuario"
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al obtener los usuarios"
        })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params

    if (validateObjectId(id, res)) return

    const user = await User.findById(id).populate("serviciosComprados")

    if (!user) {
        return handleNotFoundError("El usuario no existe", res)
    }

    res.json(user)
}

const updateUser = async (req, res) => {
    const { id } = req.params

    if (validateObjectId(id, res)) return

    const user = await User.findById(id)

    if (!user) {
        return handleNotFoundError("El usuario no existe", res)
    }

    user.usuario = req.body.usuario || user.usuario
    user.contraseña = req.body.contraseña || user.contraseña
    user.rol = req.body.rol || user.rol
    user.serviciosComprados = req.body.serviciosComprados || user.serviciosComprados

    try {
        await user.save()
        res.json({
            msg: "El usuario se actualizó correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al actualizar el usuario"
        })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params

    if (validateObjectId(id, res)) return

    const user = await User.findById(id)

    if (!user) {
        return handleNotFoundError("El usuario no existe", res)
    }

    try {
        await user.deleteOne()
        res.json({
            msg: "El usuario se eliminó correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al eliminar el usuario"
        })
    }
}

export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}