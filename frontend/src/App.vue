<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light" v-show="!isHome()">
      <router-link class="navbar-brand mb-0 h1" to="/">しりとり最強さん</router-link>
    </nav>
    <router-view id="view" />
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    isHome () {
      return this.$route.path === '/'
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
  height: 100%;
}
#nav {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
}
#view {
  position: relative;
  height: 100%;
  padding-top: 56px;
}
.fadein {
  animation-name: fadein;
  animation-duration: 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
