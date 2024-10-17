import { reactive } from 'vue'


export const userStore = reactive({
  usuarios: [{
    usuario: "hola",
    password: "123"
  }
  ],

  addUser(newUser) {
    this.usuarios.push(newUser)
  }
})

