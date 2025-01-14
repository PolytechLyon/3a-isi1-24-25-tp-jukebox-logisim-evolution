import { ref, watch } from 'vue';

const playlist = ref([]);
const currentMusic = ref(null);
const currentId = ref(0);


const loadPlaylist = () => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist') || '[]');
    playlist.value = savedPlaylist.map((music, index) => ({ ...music, id: index }));
    currentId.value = playlist.value.length;
};


const savePlaylist = () => {
    const publicPlaylist = playlist.value.filter(music => music.url.startsWith('http'));
    localStorage.setItem('playlist', JSON.stringify(publicPlaylist));
};

const addMusic = (musicName, musicUrl) => {
    playlist.value.push({ id: currentId.value, name: musicName, url: musicUrl });
    currentId.value++;
    savePlaylist();
};

function deleteMusic(id) {
    const index = playlist.value.findIndex(music => music.id === id);
    playlist.value.splice(index, 1);
    savePlaylist();
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
            nextMusic = currentMusic.value;
            break;
        }
    }

    return nextMusic;
}

loadPlaylist();

export function useGestionPlaylist() {
    return { playlist, currentMusic, addMusic, deleteMusic, playMusic, getCurrentMusic, getNextMusic };
}