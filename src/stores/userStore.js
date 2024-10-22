import { defineStore } from "pinia";
import { computed, ref } from "vue";

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
  ]);

  const userSize = computed(() => usuarios.value.length);
  const addUser = (user) => usuarios.value.push(user);
  const usuarioRegistrado = ref(null)

  return { userSize, addUser, usuarios, usuarioRegistrado };
});