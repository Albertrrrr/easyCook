<template>
  <div id="app">
    <myHeader ></myHeader>
    <hamburger></hamburger>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  padding: 0;
  margin: 0;
}

.w {
  width: 1320px;
  margin: 0 auto;
}
</style>
<script>
// header
import myHeader from '@/components/header.vue';

import hamburger from '@/components/hamburger.vue';

export default {
  components: {myHeader, hamburger,},

}
</script>