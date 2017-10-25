<template>
    <div class="home" style="width:100%;height:100%">
        <div class="search">
            <div class="yuyin"></div>
            <div class="input">
                <i class="icon ion-ios-search"></i>
                <input type="text" value="" placeholder="搜索音乐、视频、歌词、电台" id="inputvalue">
            </div>
            <div class="music">
                <span v-show="lshow">取消</span>
                <router-link to="/player" tag="span">
                    <img src="../assets/img/ph.png" alt="" >
                </router-link>
            </div>
        </div> 
        <ul class="MUU">
            <li v-for="(tab,index) in tabs" :key="tab.path" class="head-li"  :class="{on:on==index}" @click="toggle(index)">
                <span>{{tab.name}}</span>
            </li>
        </ul>
        <keep-alive>
            <router-view class="body"></router-view>
        </keep-alive>
        <footMenu></footMenu>
    </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import footMenu from "./base/home/footMenu";

export default {
  name: "home",
  data() {
    return {
      msg: "msg",
      data: [1, 2, 3, 4, 5, 6],
      Classmove: "classmove0",
      lshow: false,
      on: 0,
      tabs: [
        {
          name: "音乐",
          path: "/"
        },
        {
          name: "视频",
          path: "/video"
        },
        {
          name: "电台",
          path: "/radio"
        }
      ]
    };
  },
  // 组件
  components: {
    footMenu
  },
  // 计算属性
  computed: {},
  // 挂载后
  mounted() {
      this.$api.getSongUrl(410925920).then(res=>{
          console.log('done')
      }).catch(e=>{
          console.log('error',e);
      })
      this.$api.test(410925921).then(res=>{
          console.log('done')
      }).catch(e=>{
          console.log('error',e);
      })
  },
  // 方法
  methods: {
    toggle(index) {
      this.on = index;
      this.$router.push(this.tabs[index].path);
    },
    loadData() {
      console.log("loadData");
      let newData = this.data.map((num, index) => {
        return num * (index + 1);
      });
      this.data.push(...newData);
    }
  }
};
</script>
<style scoped lang='stylus'  rel="stylesheet/stylus">
.home {
    .body {
        position: fixed;
        top: 86px;
        bottom: 50px;
        left: 0;
        right: 0;
    }
}

.wrapper {
    width: 100%;
    height: 220px;
    overflow: hidden;
}

.content {
    padding: 10px;

    li {
        padding: 5px 8px;
        font-size: 18px;
        color: #ed5;
        background-color: #ededed;
        margin: 5px 0;
    }
}

.search {
    background: #d43b33;
    height: 46px;
    display: flex;

    .yuyin {
        flex-basis: 40px;
        background: url('../assets/img/music.png') no-repeat;
        background-position: center center;
        background-size: 32px 32px;
    }

    .input {
        flex: 1;
        position: relative;

        .icon {
            position: absolute;
            left: 40px;
            top: 50%;
            transform: translateY(-51%);
            font-size: 20px;
            color: #c6c7c9;
        }

        input {
            width: 80%;
            height: 30px;
            border-radius: 15px;
            margin-top: 8px;
            color: #c6c7c9;
            font-size: 14px;
            padding-left: 60px;
        }
    }

    .music {
        flex-basis: 40px;
        text-align: center;

        span {
            line-height: 46px;
            color: #ffffff;
        }

        img {
            width: 20px;
            height: 20px;
            margin-left: 10px;
            margin-top: 13px;
        }
    }
}

.MUU {
    display: flex;
    box-shadow: 0px 2px 4px 0px #ececec;

    .head-li {
        flex: 1;
        display: inline-block;
        box-sizing: border-box;
        width: 100px;
        height: 40px;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        background: #f8f8f9;
        color: #333;

        &.on {
            color: #d43934;

            span {
                display: inline-block;
                border-bottom: 3px solid #d43934;
                padding: 0 4px;
                height: 38px;
            }
        }

        &.active {
            color: #d43934;
        }
    }

    .head-li:nth-child(4) {
        border-right: 0;
    }
}
</style>