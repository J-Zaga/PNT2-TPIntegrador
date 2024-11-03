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
    <input 
      type="text" 
      placeholder="Buscar por nombre.." 
      v-model="searchQuery" 
      @input="updateSearch" 
      class="border p-2 rounded w-full"
    />
  </div>
</template>