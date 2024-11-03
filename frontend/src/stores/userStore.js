import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useUserStore = defineStore("userStore", () => {
  const usuarios = ref([
    {
      id: 1,
      usuario: "hola",
      password: "123",
      tipo: "usuario",
    },
    {
      id: 2,
      usuario: "adios",
      password: "asd",
      tipo: "prestador",
    },
    {
      id: 3,
      usuario: "juan",
      password: "1234",
      tipo: "admin",
    },
  ])

  const userSize = computed(() => usuarios.value.length)
  function addUser(nuevoUsuario) {
    const id = usuarios.value.length + 1; 
    usuarios.value.push({ id, ...nuevoUsuario });
  }
  const usuarioRegistrado = ref(null)

  return { userSize, addUser, usuarios, usuarioRegistrado }
})