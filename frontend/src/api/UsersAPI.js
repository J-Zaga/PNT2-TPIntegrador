import api from "../lib/axios"

export default {
    all() {
        return api.get('/usuarios')
    },
    add(user) {
        return api.post('/usuarios', user)
    }
}