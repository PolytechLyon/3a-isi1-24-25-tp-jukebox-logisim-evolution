<script setup>
import { ref } from 'vue';

const trackFile = ref(null);
const isUploadDisabled = ref(true);

const handleMethodChange = (event) => {
    if (event.target.value === 'upload') {
        isUploadDisabled.value = !trackFile.value;
    } else {
        isUploadDisabled.value = true;
    }
}

const handleFileChange = (event) => {
    trackFile.value = event.target.files[0];
    if (trackFile.value) {
        isUploadDisabled.value = false;
    } else {
        isUploadDisabled.value = true;
    }
}

const handleRemoveTrack = () => {
    trackFile.value = null;
    isUploadDisabled.value = true;
    document.getElementById('track-file').value = null;
}
</script>

<template>
    <h2>Add Track</h2>
    <label for="method-selector">Choose a method to add a track </label>
    <select id="method-selector" @change="handleMethodChange">
        <option value="upload">Upload</option>
        <option value="link">Link</option>
    </select>
    <input type="file" id="track-file" @change="handleFileChange" />
    <button :disabled="isUploadDisabled">Upload</button>
    <button @click="handleRemoveTrack">Supprimer le morceau</button>
</template>

<style scoped>
    
</style>