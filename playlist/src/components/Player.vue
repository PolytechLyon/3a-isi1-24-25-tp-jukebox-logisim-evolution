<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist'; 
const { getCurrentMusic, getNextMusic } = useGestionPlaylist();

const playingMessage = ref('Now playing: ');
const audioReference = ref(null);
const progressReference = ref(null);
const currentMusic = ref(null);
const textButtonPlayPause = ref('play');
const choiceReference = ref(0);

watchEffect(async () => { 
    currentMusic.value = getCurrentMusic();
    if (audioReference.value) {
        textButtonPlayPause.value = 'pause';
        setTimeout(() => {
            audioReference.value.play();
        }, 10);
    }
});

const togglePlayPause = () => {
    const audio = audioReference.value;
    if (audio.paused) {
        audio.play();
        textButtonPlayPause.value = 'pause';
    } else {
        audio.pause();
        textButtonPlayPause.value = 'play';
    }
};

const updateProgressBar = () => {
    const audio = audioReference.value;
    const progress = progressReference.value;
    if (audio && progress) {
        const progressValue = (audio.currentTime / audio.duration) * 100 || 0;
        progress.value = progressValue;
        if (audio.ended){
            audio.currentTime = 0;
            audio.play();
        }
    }
};

onMounted(async () => {
    const audio = audioReference.value;
    if (audio) {
        console.log('Attaching timeupdate event');
        audio.addEventListener('timeupdate', updateProgressBar);
    }
});

onBeforeUnmount(() => {
    const audio = audioReference.value;
    if (audio) {
        audio.removeEventListener('timeupdate', updateProgressBar);
    }
});

</script>

<template>
    <h2>Player</h2>

    <div class="playing"> {{ playingMessage }} {{ currentMusic ? currentMusic.name : '' }}
        <div v-if="currentMusic">
            <audio :src="currentMusic.url" ref="audioReference"></audio>
            <button @click="togglePlayPause">{{ textButtonPlayPause }}</button>
            <progress id="progress" ref="progressReference" value="0" max="100"></progress>
        </div>
        <div v-else>
            <p>No music selected</p>
        </div>
    </div>
    <fieldset>
        <legend>Playback mode</legend>  
        <input type="radio" id="repeat-list" name="mode" value="repeat-list" checked="checked" />
        <label for="repeat-list">Repeat list</label>
        <input type="radio" id="repeat-one" name="mode" value="repeat-one" />
        <label for="repeat-one">Repeat one</label>
        <input type="radio" id="no-repeat" name="mode" value="don-t-repeat" />
        <label for="don-t-repeat">No Repeat</label>
    </fieldset>
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