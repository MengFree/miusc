<template>
  <div id="app">
    <div class="marsk" v-if="loading">
      <div class="marsk-content">
        LOADING
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["loading"]),
  },
};
</script>

<style lang="less">
@import './assets/css/reset.css';
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.marsk {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .marsk-content {
    position: absolute;
    top: 30%;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
