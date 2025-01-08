<script setup>
import { ref } from 'vue'

const txtlist = ref([])

const addItem = () => {
    const title = document.getElementById('new-todo-item-title').value
    if (title) {
        txtlist.value.push({ id: txtlist.value.length + 1, title })
        document.getElementById('new-todo-item-title').value = ''
    }
    console.log('Item '+ txtlist.value.length +' added')
}

</script>

<template>
    <h2>Playlist</h2>
</template>

<style scoped>

</style>