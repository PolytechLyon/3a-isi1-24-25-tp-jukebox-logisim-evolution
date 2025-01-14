import { ref, watch } from 'vue';

const playlist = ref([]);
const currentMusic = ref(null);
const currentId = ref(0);


/**
 * Loads the playlist from local storage and updates the playlist and currentId.
 * 
 * Retrieves the playlist from local storage, parses it, and assigns it to the 
 * playlist variable. Each music item in the playlist is assigned a unique id 
 * based on its index in the array. The currentId is updated to reflect the 
 * length of the playlist.
 */
const loadPlaylist = () => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist') || '[]');
    playlist.value = savedPlaylist.map((music, index) => ({ ...music, id: index }));
    currentId.value = playlist.value.length;
};


/**
 * Saves the current playlist to local storage.
 * 
 * Filters the playlist to include only public music (those with URLs starting with 'http'),
 * and then stores the filtered playlist in the browser's local storage as a JSON string.
 */
const savePlaylist = () => {
    const publicPlaylist = playlist.value.filter(music => music.url.startsWith('http'));
    localStorage.setItem('playlist', JSON.stringify(publicPlaylist));
};

/**
 * Adds a new music entry to the playlist.
 *
 * @param {string} musicName - The name of the music to be added.
 * @param {string} musicUrl - The URL of the music to be added.
 */
const addMusic = (musicName, musicUrl) => {
    playlist.value.push({ id: currentId.value, name: musicName, url: musicUrl, playable: true });
    currentId.value++;
    savePlaylist();
};

/**
 * Deletes a music item from the playlist by its ID.
 *
 * @param {number} id - The ID of the music item to delete.
 */
function deleteMusic(id) {
    const index = playlist.value.findIndex(music => music.id === id);
    playlist.value.splice(index, 1);
    savePlaylist();
}

/**
 * Plays the music with the given ID from the playlist.
 *
 * @param {number} id - The ID of the music to play.
 * @throws Will log an error if the music with the given ID is not found in the playlist.
 */
function playMusic(id) {
    const playlistFiltered = playlist.value.filter(music => music.id === id);
    if (playlistFiltered.length > 0) {
        currentMusic.value = playlistFiltered[0];
    } else {
        console.error('Music not found');
    }
}

/**
 * Retrieves the current music from the playlist.
 *
 * @returns {Object} The current music object.
 */
function getCurrentMusic() {
    return currentMusic.value;
}

/**
 * Retrieves the next music track in the playlist.
 * If the current track is the last one, it wraps around to the first track.
 * Skips tracks that do not have a name ending with '.mp3', '.ogg' or '.wav'.
 * If no valid next track is found, returns the current track.
 *
 * @returns {Object} The next music track object in the playlist.
 */
function getNextMusic() {
    const index = playlist.value.findIndex(music => music.id === currentMusic.value.id);
    let nextIndex = (index + 1) % playlist.value.length;
    let nextMusic = playlist.value[nextIndex];

    while (nextMusic && !nextMusic.playable) {
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