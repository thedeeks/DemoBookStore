<template>  
  <div id="app">
    <HeaderBar />
    <BookStore/>
  </div>
</template>

<script>
import HeaderBar from './components/header-bar.vue';
import BookStore from './components/book-store.vue';

export default {
  name: 'App',
  components: {
    HeaderBar, BookStore
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@import '@/design/index.scss'
</style>
