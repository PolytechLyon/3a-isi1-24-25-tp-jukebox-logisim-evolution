<script setup>

</script>

<template>
    <h2>Player</h2>
    <div>Choose a song to play</div>
    <fieldset>
        <legend>Playback mode</legend>
        <input type="radio" id="repeat-list" name="mode" value="repeat-list" checked="checked" />
        <label for="repeat-list">Repeat list</label>
        <input type="radio" id="repeat-one" name="mode" value="repeat-one" />
        <label for="repeat-one">Repeat one</label>
        <input type="radio" id="don-t-repeat" name="mode" value="don-t-repeat" />
        <label for="don-t-repeat">Don't repeat</label>
    </fieldset>
</template>

<style scoped>
    fieldset {
        margin-top: 1rem;
    }
</style>