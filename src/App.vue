<script setup>
import Player from './components/Player.vue'
import Playlist from './components/Playlist.vue'
import AddTrack from './components/AddTrack.vue';
</script>

<template>
  <header>
    <h1>Jukebox</h1>
    <Player />
    <Playlist />
    <AddTrack />
  </header>
</template>

<style scoped>
header {
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}
</style>
