<script setup>
import { ref } from 'vue'

const buscador = ref('')

</script>


<template>
    <div>
        <input v-model="buscador" type="text" id="buscador" placeholder="Buscar" required />
    </div>
</template>




<style scoped></style>