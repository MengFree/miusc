<template>
    <div class="music">
        <scroll class="music-wrapper" ref="musicWrapper" :data="lists">
            <div class="hello">
                <div class="swipe-wrapper">
                    <div class="my-swipe">
                        <div class="slide1">
                            <img src="/static/img/1.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="cards border-1px">
                    <div v-for="menu in midleMenu" :key="menu.path" class="card-li">
                        <div class="circle" :class="menu.logo">
                        </div>
                        <p>{{menu.name}}</p>
                    </div>
                </div>
                <List :list='list' v-for="list in lists" :key="list.name"></List>
            </div>
        </scroll>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
import scroll from "../scroll";
import List from "../moduleList";

export default {
  name: "music",
  data() {
    return {
      midleMenu: [
        {
          name: "私人FM",
          path: "/fm",
          logo: "FM"
        },
        {
          name: "每日推荐",
          path: "/fm",
          logo: "DAY"
        },
        {
          name: "歌单",
          path: "/fm",
          logo: "LIST"
        },
        {
          name: "排行榜",
          path: "/fm",
          logo: "RANK"
        }
      ],
      lists: []
    };
  },
  // 组件
  components: {
    scroll,List
  },
  // 计算属性
  computed: {},
  // 挂载后
  mounted() {
    //   this.$api.getList().then((res)=>{
    //       this.lists.push(res);
    //   });
      this.$api.getPlaylists().then(res=>{
          this.lists.push({
              title:'推荐歌单',
              playlists:res.data.playlists
          })
      })
  },
  // 方法
  methods: {}
};
</script>
<style scoped lang='less'>
.music-wrapper {
  width: 100%;
  position: absolute;
  top: 87px;
  bottom: 0;
  overflow: hidden;
  background: #fff;

  .my-swipe {
    height: 139px;
    color: #fff;
    font-size: 30px;
    text-align: center;

    img {
      width: 100%;
    }
  }

  .cards {
    display: flex;
    border-bottom: 1px solid #e2e3e5;

    .card-li {
      // display: inline-block;
      flex: 1;
      // width: 30%;
      // margin-left: 2.5%;
      margin-top: 10px;
      margin-bottom: 10px;

      .circle {
        position: relative;
        width: 58%;
        margin: 0 auto;
        height: 0;
        padding-top: 58%;
        border-radius: 50%;
        border: 1px solid #b84542;
        background-repeat: no-repeat;
        background-size: 70%;
        background-position: center;

        span {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: -15px;
          margin-top: -15px;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 20px;
          color: #d43a30;
        }

        &.FM {
          background-image: url("../../../assets/img/FM.png");
        }

        &.DAY {
          background-image: url("../../../assets/img/DAY.png");
        }

        &.LIST {
          background-image: url("../../../assets/img/LIST.png");
        }

        &.RANK {
          background-image: url("../../../assets/img/RANK.png");
        }
      }

      p {
        color: #333;
        font-size: 10px;
        text-align: center;
        margin-top: 5px;
      }
    }
  }
}
</style>