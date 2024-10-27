<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['update:searchQuery'])

function updateSearch() {
  emit('update:searchQuery', searchQuery.value)
}
</script>

<template>
    <div class="filters">
        <input type="text" placeholder="Buscar por nombre.." v-model="searchQuery" @input="updateSearch"/>
    </div>
</template>

<style scoped>
.filters {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.filters input[type="text"] {
  color: black;
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1.2rem;
  background-color: #fff;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s ease-in-out;
}

.filters input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
}
</style>