import api from "../lib/axios"

export default {
    all(){
        return api.get('/servicios')
    },
    update(id, serviceData) {
        return api.put(`/servicios/${id}`, serviceData)
    }
}