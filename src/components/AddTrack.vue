<script setup>
import { ref } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist';
const { playlist, addMusic } = useGestionPlaylist();

let addTrackOptions = ref(["By URL", "Via file upload"]);
let uploadFile = ref(null);
let songURL = ref("");
let blobURL = ref("");
let songName = ref("");

/**
 * Handles the change event for a file input element.
 * 
 * @param {Event} event - The change event triggered by the file input element.
 * @returns {void}
 */
function onChange(event) {
	uploadFile.value = (event.target.value == addTrackOptions.value[1]);
}

/**
 * Handles the file upload event, creating a URL for the selected file and extracting the file name.
 * 
 * @param {Event} event - The file input change event.
 * @returns {void}
 */
function uploadSelected(event) {
    blobURL.value = URL.createObjectURL(event.target.files[0]);
    songName.value = event.target.value;
    songName.value = songName.value.substring(songName.value.lastIndexOf("\\") + 1);
}

/**
 * Adds a new music track to the playlist.
 * This function retrieves the song name and blob URL from the input fields,
 * adds the music to the playlist, and then clears the input fields.
 *
 * @function addUpload
 */
function addUpload() {
    addMusic(songName.value, blobURL.value);
    songName.value = "";
    blobURL.value = "";
}

/**
 * Adds a new track URL to the playlist.
 * 
 * This function extracts the file name from the provided URL and adds it to the playlist.
 * After adding the track, it clears the input field.
 * 
 * @function addURL
 * @returns {void}
 */
function addURL() {
    let songNameShort = songURL.value;
	songNameShort = songNameShort.substring(songNameShort.lastIndexOf("\\") + 1);
	addMusic(songNameShort, songURL.value);
	songURL.value = "";
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
			<button :disabled="!blobURL" @click="addUpload">Add uploaded file</button>
		</span>
		<span v-else>
			<input v-model="songURL" type="text" placeholder="Provide URL" />
			<button :disabled="!songURL" @click="addURL">Add URL</button>
		</span>
	</div>
</template>

<style scoped>

</style>