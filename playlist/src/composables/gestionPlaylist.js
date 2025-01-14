import { ref } from 'vue';

const playlist = ref([]);
const currentMusic = ref(null);
const currentId = ref(0);

const addMusic = (musicName, musicUrl) => {
    playlist.value.push({ id: currentId.value, name: musicName, url: musicUrl });
    currentId.value++;
}

function deleteMusic(id) {
    const index = playlist.value.findIndex(music => music.id === id);
    playlist.value.splice(index, 1);
}

function playMusic(id) {
    const playlistFiltered = playlist.value.filter(music => music.id === id);
    if (playlistFiltered.length > 0) {
        currentMusic.value = playlistFiltered[0];
    } else {
        console.error('Music not found');
    }
}

function getCurrentMusic() {
    return currentMusic.value;
}

function getNextMusic() {
    const index = playlist.value.findIndex(music => music.id === currentMusic.value.id);
    let nextIndex = (index + 1) % playlist.value.length;
    let nextMusic = playlist.value[nextIndex];

    while (nextMusic && !nextMusic.name.endsWith('.mp3')) {
        nextIndex = (nextIndex + 1) % playlist.value.length;
        nextMusic = playlist.value[nextIndex];
        if (nextIndex === index) {
            nextMusic = null;
            break;
        }
    }

    return nextMusic;
}

export function useGestionPlaylist() {
    return { playlist, currentMusic, addMusic, deleteMusic, playMusic, getCurrentMusic, getNextMusic };
}