import { ref } from 'vue';

const playlist = ref([]);
const currentMusic = ref(null);
const currentId = ref(0);

const addMusic = (musicName, musicUrl) => {
    playlist.push({id: currentId, name: musicName, url: musicUrl});
    currentId.value++;
}