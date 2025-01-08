<script setup>

</script>

<template>
    <h2>Add Track</h2>
    <label for="method-selector">Choose a method to add a track </label>
    <select id="method-selector">
        <option value="upload">Upload</option>
        <option value="link">Link</option>
    </select>
    <input type="file" id="track-file" />
    <button disabled>Upload</button>
</template>

<style scoped>
    
</style>