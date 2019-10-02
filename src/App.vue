<template>
  <div id="app">
    <Grid/>
  </div>
</template>

<script>
import './assets/scss/app.scss';
import Grid from './components/Grid.vue';

export default {
  name: 'app',
  components: {
    Grid,
  },
};
</script>
