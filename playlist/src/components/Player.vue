<script setup>
import { ref } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist';
const { playlist, currentmusic } = useGestionPlaylist();
const playingMessage = `No music playing.`;
if (currentmusic != null) {
    playingMessage = `Now playing: ${currentmusic.value.name}`;
}

</script>

<template>
    <h2>Player</h2>

    <div class="playing"> {{ playingMessage }} </div>

    <div>
    <div>Choose a song to play</div>
    <fieldset>
        <legend>Playback mode</legend>
        <input type="radio" id="repeat-list" name="mode" value="repeat-list" checked="checked" />
        <label for="repeat-list">Repeat list</label>
        <input type="radio" id="repeat-one" name="mode" value="repeat-one" />
        <label for="repeat-one">Repeat one</label>
        <input type="radio" id="don-t-repeat" name="mode" value="don-t-repeat" />
        <label for="don-t-repeat">Don't repeat</label>
    </fieldset>
    </div>
</template>

<style scoped>
fieldset {
    margin-top: 1rem;
}

.playing {
    background-color: lightsteelblue;
    margin: 1rem;
    border-radius: 5px;
    width: auto;

}
</style>