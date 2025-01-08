<script setup>
import { ref } from 'vue';

const trackFile = ref(null);
const isUploadDisabled = ref(true);
const isLinkMode = ref(false);
const linkText = ref('');

const handleMethodChange = (event) => {
    if (event.target.value === 'upload') {
        isLinkMode.value = false;
        isUploadDisabled.value = !trackFile.value;
    } else {
        isLinkMode.value = true;
        isUploadDisabled.value = !linkText.value;
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

const handleLinkChange = (event) => {
    linkText.value = event.target.value;
    isUploadDisabled.value = !linkText.value;
}
</script>

<template>
    <h2>Add Track</h2>
    <label for="method-selector">Choose a method to add a track </label>
    <select id="method-selector" @change="handleMethodChange">
        <option value="upload">Upload</option>
        <option value="link">Link</option>
    </select>
    <input v-if="!isLinkMode" type="file" id="track-file" @change="handleFileChange" />
    <input v-else placeholder="Provide URL" type="text" @input="handleLinkChange" />
    <button :disabled="isUploadDisabled">Upload</button>
</template>

<style scoped>
    
</style>