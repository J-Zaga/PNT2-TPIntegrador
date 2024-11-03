<script setup>

</script>

<template>
    <div class="flex justify-between">
        <h1 class="text-2xl lg:text-6xl font-black text-gray-700">MascotApp</h1>

        <div class="flex flex-col space-y-5">
            <div class="flex gap-2 items-center">
                <p class="text-black text-right">Hola: usuario</p>
                <button type="button"  class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase
                text-xs font-extrabold rounded-lg">Cerrar Sesión</button>
        </div>

        <nav class="flex gap-2 items-center justify-end">
            <button class="p-3 text-white uppercase text-xs font-black rounded-lg bg-gray-400">Mis citas</button>

            <RouterLink 
                :to="{ name: 'new-appointment' }"
                class="p-3 text-white uppercase text-xs font-black rounded-lg bg-purple-800"
            >
                Nueva cita
            </RouterLink>
 
        </nav>

        </div>
    </div>

    <main>
        <RouterView />
    </main>
</template>



