<script setup>
import { useGestionPlaylist } from '../composables/gestionPlaylist';
const { playlist, deleteMusic, playMusic, getCurrentMusic } = useGestionPlaylist();

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
            audio.play();
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
                <td>{{ track.name }}</td>
                <td>
                    <button @click="handlePlayMusic(track.id)">Play</button>
                    <button @click="deleteMusic(track.id)">Remove</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>

</style>