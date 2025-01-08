<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist'; 
const { getCurrentMusic, getNextMusic } = useGestionPlaylist();

const audioReference = ref(null);
const progressReference = ref(null);
const currentMusic = ref(null);
const textButtonPlayPause = ref('play');
const choiceReference = ref(0);

watchEffect(async () => { 
    currentMusic.value = getCurrentMusic();
    await nextTick(); // Attendre que l'élément audio soit rendu
    if (audioReference.value) {
        console.log('Audio element is rendered'); // Ajoutez cette ligne pour déboguer
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
        console.log(`Progress: ${progressValue}%`); // Ajoutez cette ligne pour déboguer
        if (audio.ended){
            audio.currentTime = 0;
            audio.play();
        }
    }
};

onMounted(async () => {
    await nextTick(); // Attendre que l'élément audio soit rendu
    const audio = audioReference.value;
    if (audio) {
        console.log('Attaching timeupdate event'); // Ajoutez cette ligne pour déboguer
        audio.addEventListener('timeupdate', updateProgressBar);
    } else {
        console.log('Audio reference is null'); // Ajoutez cette ligne pour déboguer
    }
});

onBeforeUnmount(() => {
    const audio = audioReference.value;
    if (audio) {
        console.log('Removing timeupdate event'); // Ajoutez cette ligne pour déboguer
        audio.removeEventListener('timeupdate', updateProgressBar);
    } else {
        console.log('Audio reference is null'); // Ajoutez cette ligne pour déboguer
    }
});

</script>

<template>
    <h2>Player</h2>

    <div class="playing"> {{ playingMessage }} </div>

    <div>
    <div v-if="currentMusic">
        <audio :src="currentMusic.url" ref="audioReference"></audio>
        <button @click="togglePlayPause">{{ textButtonPlayPause }}</button>
        <progress id="progress" ref="progressReference" value="0" max="100"></progress>
    </div>
    <div v-else>
        <p>No music selected</p>
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