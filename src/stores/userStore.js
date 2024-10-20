import { reactive } from 'vue'


export const userStore = reactive({
  usuarios: [{
    usuario: "hola",
    password: "123"
  }
  ],
  prestadores:[{
    usuario: "adios",
    password: "asd"
  }
  ],
  administradores:[{
    usuario: "juan",
    password: "1234"
  }],

  addPrestador(newUser){
    this.prestadores.push(newUser)
  },

  addUsuario(newUser) {
    this.usuarios.push(newUser)
  }
})

