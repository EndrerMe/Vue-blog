<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import '@/assets/fonts/font.css'

export default {
  name: 'app',
}
</script>

<style>
  html {
    overflow-x: hidden;
  }

  html::-webkit-scrollbar {
    width: 5px;
  }
  
  html::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  
  html::-webkit-scrollbar-thumb {
    background-color: black;
    outline: 1px solid black;
  }

  body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
  }

  #app {
    width: 100%;
    height: 100%;
  }

</style>
