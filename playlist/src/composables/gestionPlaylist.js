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

export function useGestionPlaylist() {
    return { playlist, currentMusic, addMusic, deleteMusic };
}