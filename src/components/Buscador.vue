<script setup>
import { ref, defineEmits } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['update:searchQuery'])

function updateSearch() {
  emit('update:searchQuery', searchQuery.value)
}
</script>

<template>
    <div>
        <input type="text" placeholder="Buscar por nombre.." v-model="searchQuery" @input="updateSearch"/>
    </div>
</template>

<style scoped>
</style>