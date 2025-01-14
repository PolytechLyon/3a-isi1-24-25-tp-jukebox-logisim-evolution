<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist'; 
const { getCurrentMusic, getNextMusic } = useGestionPlaylist();

const playingMessage = ref('Now playing: ');
const audioReference = ref(null);
const progressReference = ref(null);
const currentMusic = ref(null);
const textButtonPlayPause = ref('play');
const playbackMode = ref('repeat-list');

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
            switch (playbackMode.value) {
                case 'repeat-list':
                    nextTick(() => {
                        const nextMusic = getNextMusic();
                        if (nextMusic) {
                            currentMusic.value = nextMusic;
                            audio.src = nextMusic.url;
                            audio.addEventListener('canplay', () => {
                                audio.play();
                                textButtonPlayPause.value = 'pause';
                            }, { once: true });
                        }
                    });
                    break;
                case 'repeat-one':
                    audio.play();
                    break;
                case 'don-t-repeat':
                    audio.pause();
                    textButtonPlayPause.value = 'play';
                    break;
            }
        }
    }
};

onMounted(() => {
    const audio = audioReference.value;
    if (audio) {
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
            <button @click="togglePlayPause">{{ textButtonPlayPause }}</button>
            <progress id="progress" ref="progressReference" value="0" max="100"></progress>
        </div>
        <div v-else>
            <p>No music selected</p>
        </div>
        <audio :src="currentMusic ? currentMusic.url : ''" ref="audioReference"></audio>
    </div>
    <fieldset>
        <legend>Playback mode</legend>  
        <input type="radio" id="repeat-list" name="mode" value="repeat-list" v-model="playbackMode" />
        <label for="repeat-list">Repeat list</label>
        <input type="radio" id="repeat-one" name="mode" value="repeat-one" v-model="playbackMode" />
        <label for="repeat-one">Repeat one</label>
        <input type="radio" id="no-repeat" name="mode" value="don-t-repeat" v-model="playbackMode" />
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