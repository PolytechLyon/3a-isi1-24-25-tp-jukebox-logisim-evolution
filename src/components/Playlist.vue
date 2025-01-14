<script setup>
import { nextTick } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist';
const { playlist, deleteMusic, playMusic, getCurrentMusic } = useGestionPlaylist();

/**
 * Handles the play music action.
 * 
 * This function performs the following steps:
 * 1. Retrieves the current music being played.
 * 2. If there is a current music and its ID is different from the provided ID, pauses the current audio.
 * 3. Calls the playMusic function with the provided ID.
 * 4. Uses nextTick to ensure the DOM is updated before proceeding.
 * 5. Finds the new music in the playlist by the provided ID.
 * 6. If the new music is found, updates the audio source to the new music's URL and plays the audio.
 * 
 * @param {number} id - The ID of the music to be played.
 */
const handlePlayMusic = (id) => {
    const currentMusic = getCurrentMusic();
    if (currentMusic && currentMusic.id !== id) {
        const audio = document.querySelector('audio');
        if (audio) {
            audio.pause();
        }
    }
    playMusic(id);
    nextTick(() => {
        const audio = document.querySelector('audio');
        if (audio) {
            const newMusic = playlist.value.find(music => music.id === id);
            if (newMusic) {
                audio.src = newMusic.url;
                audio.play();
            }
        }
    });
};

</script>

<template>
    <h2>Playlist</h2>
    <table>
        <thead>
            <tr>
                <th>Track</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="track in playlist" :key="track.id">
                <td :class="{ 'playing-track': getCurrentMusic() && getCurrentMusic().id === track.id, 
                        'unplayable-track': !(track.name.endsWith('.mp3') || track.name.endsWith('.ogg') || track.name.endsWith('.wav')) }">
                        {{ track.name }}
                    </td>
                <td>
                    <button :disabled="!(track.name.endsWith('.mp3') || track.name.endsWith('.ogg') || track.name.endsWith('.wav'))" @click="handlePlayMusic(track.id)">Play</button>
                    <button  @click="deleteMusic(track.id)">Remove</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.playing-track {
    font-weight: bold;
}
.unplayable-track {
    text-decoration: line-through;
}
</style>