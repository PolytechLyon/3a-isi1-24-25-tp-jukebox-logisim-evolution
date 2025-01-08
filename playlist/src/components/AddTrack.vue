<script setup>
import { ref } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist';
const { playlist, addMusic } = useGestionPlaylist();

let addTrackOptions = ref(["By URL", "Via file upload"]);
let uploadFile = ref(null);
let songURL = ref("");
let blobURL = ref("");
let songName = ref("");

function onChange(event) {
	uploadFile.value = (event.target.value == addTrackOptions.value[1]);
}

function uploadSelected(event) {
    blobURL.value = URL.createObjectURL(event.target.files[0]);
    songName.value = event.target.value;
    songName.value = songName.value.substring(songName.value.lastIndexOf("\\") + 1);
}

function clickUpload() {
    addMusic(songName.value, blobURL.value);
    songName.value = "";
    blobURL.value = "";
}

function clickURL() {
    console.log('URL added');
}

</script>

<template>
    <div>
		<h2>New track</h2>
		<label for="method-selector">Add track</label>
		<select id="method-selector" @change="onChange">
			<option v-for="option in addTrackOptions">{{ option }}</option>
		</select>
		<span v-if="uploadFile">
			<input type="file" @change="uploadSelected" id="file-upload"/>
			<button :disabled="!blobURL" @click="clickUpload">Add uploaded file</button>
		</span>
		<span v-else>
			<input v-model="songURL" type="text" placeholder="Provide URL" />
			<button :disabled="!songURL" @click="clickURL">Add URL</button>
		</span>
	</div>
</template>

<style scoped>

</style>