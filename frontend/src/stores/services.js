import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import ServicesAPI from '../api/ServicesAPI'

export const useServiceStore = defineStore('services', () => {

    const services = ref([])

    onMounted(async () => {
        try{
            const { data } = await ServicesAPI.all()
            services.value = data
        }catch(error){
            console.log(error)
        }
    })
    const addService = async (service) => {
        try {
            const { data } = await ServicesAPI.post(service)
            services.value.push(data)
        } catch (error) {
            console.error("Error al agregar servicio:", error)
        }
    }
    return{
        services,
        addService
    }
})