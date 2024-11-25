import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import UsersAPI from '../api/UsersAPI' 

export const useUserStore = defineStore('users', () => {
    const users = ref([])
    const usuarioRegistrado = ref(null) 

    const fetchUsers = async () => {
        try {
            const { data } = await UsersAPI.all() 
            users.value = data
        } catch (error) {
            console.log(error)
        }
    }

    const setUsuarioRegistrado = (user) => {
        usuarioRegistrado.value = user
    }
    onMounted(fetchUsers)

    const addUser = async (user) => {
        try {
            const response = await UsersAPI.add(user) 
            users.value.push(response.data)
        } catch (error) {
            console.error('Error al agregar usuario:', error)
            throw new Error('No se pudo crear el usuario')
        }
    }
    const getUsers = () => users.value
    
    const getUsuarioRegistrado = () => usuarioRegistrado.value

    return {
        getUsers,
        getUsuarioRegistrado,
        setUsuarioRegistrado,
        addUser,
        fetchUsers
    }
})