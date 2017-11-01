<template>
  <div id="app">
    <div class="marsk" v-if="loading">
      <div class="marsk-content">
        LOADING
      </div>
    </div>
    <transition name="main-transition"  enter-active-class="animated slideInRight" leave-active-class=" animated slideOutLeft">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["loading"]),
  },
  mounted(){
    document.getElementById('bg').remove();
  }
};
</script>

<style lang="less">
@import './assets/css/reset.css';
@import './assets/css/animate.css';
@import './assets/css/ionicons.min.css';
#app {
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family:  -apple-system, BlinkMacSystemFont,"Microsoft YaHei", "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  height: 100%;
  width: 100%;
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
.icon {
    position: relative;
    z-index: 0;
    display: inline-block;
    text-align: center;
    font-weight: normal;
    font-size: 20px;
    vertical-align: middle;

    &.ion-ios-arrow-right::before {
        content: '\f3d3';
    }

    &.ion-ios-search::before {
        content: '\f4a5';
    }
}
</style>
