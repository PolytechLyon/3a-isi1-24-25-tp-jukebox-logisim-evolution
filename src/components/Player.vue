<script setup>
import { ref, watchEffect, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useGestionPlaylist } from '../composables/gestionPlaylist'; 
const { getCurrentMusic, getNextMusic, playMusic, playlist } = useGestionPlaylist();

const playingMessage = ref('Now playing: ');
const audioReference = ref(null);
const progressReference = ref(null);
const currentMusic = ref(null);
const textButtonPlayPause = ref('play');
const playbackMode = ref('repeat-list');

/**
 * Watches for changes and updates the current music and play/pause button text.
 * If there is an audio reference and current music, it sets the play/pause button text to 'pause'
 * and plays the audio after a short delay.
 */
watchEffect(() => { 
    currentMusic.value = getCurrentMusic();
    if (audioReference.value && currentMusic.value) {
        textButtonPlayPause.value = 'pause';
        setTimeout(() => {
            audioReference.value.play().catch(() => {
                    console.log(currentMusic);
                    console.log(playlist.value.findIndex(song => song.id === currentMusic.id));
                    playlist.value[playlist.value.findIndex(song => song.id === currentMusic.id)].playable = false;
                    getNextMusic();
                });
        }, 10);
    }
});

/**
 * Toggles the play/pause state of the audio element.
 * If the audio is currently paused, it will start playing and the button text will change to 'pause'.
 * If the audio is currently playing, it will pause and the button text will change to 'play'.
 */
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

/**
 * Updates the progress bar based on the current playback time of the audio.
 * - Calculates the progress value as a percentage of the current time over the total duration.
 * - Updates the progress bar's value.
 * - Handles the end of the audio playback based on the playback mode:
 *   - 'repeat-list': Plays the next music in the list.
 *   - 'repeat-one': Replays the current music.
 *   - 'don-t-repeat': Pauses the audio and sets the play/pause button to 'play'.
 */
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
                            playMusic(nextMusic.id);
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

/**
 * Handles the click event on the progress bar to update the current time of the audio.
 *
 * @param {MouseEvent} event - The mouse event triggered by clicking on the progress bar.
 *
 * This function calculates the new playback time based on the click position
 * relative to the progress bar's width and updates the audio's current time accordingly.
 */
const clickProgressBar = (event) => {
    const audio = audioReference.value;
    const progress = progressReference.value;
    if (audio && progress) {
        const rect = progress.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newTime = (offsetX / rect.width) * audio.duration;
        audio.currentTime = newTime;
    }
};

/**
 * Lifecycle hook that is called when the component is mounted.
 * It retrieves the audio element from the audioReference and adds an event listener
 * for the 'timeupdate' event to update the progress bar.
 */
onMounted(() => {
    const audio = audioReference.value;
    if (audio) {
        audio.addEventListener('timeupdate', updateProgressBar);
    }
});

/**
 * Lifecycle hook that is called right before the component is unmounted.
 * This function removes the 'timeupdate' event listener from the audio element
 * to prevent memory leaks and unnecessary updates when the component is destroyed.
 * 
 * @onBeforeUnmount - Vue lifecycle hook
 * @audioReference - Reference to the audio element
 * @updateProgressBar - Function to update the progress bar based on the audio's current time
 */
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
            <progress id="progress" ref="progressReference" value="0" max="100" @click="clickProgressBar"></progress>
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