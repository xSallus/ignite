<template>
  <Header />
  <router-view/>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>


<style lang="scss">
@import './styles/colors.scss';

@font-face {
  font-family: 'RbMono';
  src: url('./assets/fonts/RobotoMono-Regular.ttf');
}

@font-face {
  font-family: 'Poppins';
  src: url('./assets/fonts/Poppins-Regular.ttf');
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  height: 100vh;
  width: 100vw;

  font-family: 'RbMono', -apple-system, sans-serif;

  color: $gray300;
  background: $black;

  button {
    cursor: pointer;
  }
}
</style>
