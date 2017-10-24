<template>
    <div class="musicsong-wrapper" v-show="showFlag" key="musicsong">
      <div class="scroll-warpper">
        <div class="menu-title border-1px">
          <div class="back">
            <img src="../../static/img/back.png" alt="" width=24 height=24>
          </div>
          <div class="title-name">
            {{song.name}}-
            {{song.songname}}
          </div>
          <div class="setting" >
            <img src="../../static/img/list-1.png" alt="" width=24 height=24>
          </div>
        </div>
        <div class="rotate">
          <div class="rotate-img" :class="{'cd-paly':!playing}">
            <img src="../../static/img/stick_bg.png" alt="" height=140 >
          </div>
          <div class="rotate-mid" :class="{'cd-rotate':!playing}">
            <img :src="'../../static/img/ordert.jpg'" alt="">
          </div>
        </div>
        <div class="bottom">
          <div class="menu">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="progress">
            <!-- <progressslider :mwidth="mwidth" @change="setTime"></progressslider> -->
            <div class="time">
              <span id="cur">{{time.start}}</span>
              <span id="total">{{time.end}}</span>
            </div>
          </div>
          <div class="action">
            <span></span>
            <span @click="pre"></span>
            <span @click="togglePlay" :class="{'isplay':playing,'noplay':!playing}"></span>
            <span @click="next"></span>
            <span @click="showlist"></span>
          </div>
        </div>
      </div>
      <div class="bg">
        <img :src="'../../static/img/ordert.jpg'" alt="" width="100%" height="100%">
      </div>
      <div class="">
        <!-- <audio :src="audiourl" id="audioPlay" @canplay="canPlaySong"
               @timeupdate="updateTime"
        ></audio> -->
      </div>
      <!-- <div class="tip" v-show="tipshow">
        <div class="content">
          歌曲加载错误！
        </div>
        <div class="fun" @click="tipshow = !tipshow">
          确定
        </div>
      </div> -->
      <div class="list">
        <transition name="fade">
          <div class="list-bg" @click="hidelist"  v-show="listshow"></div>
        </transition >
        <transition name="fold">
          <div class="list-song" v-show="listshow">
            <div class="title" @click="nulllist">清空</div>
            <div ref="songlistWrapper" class="ul-song">
              <ul>
                <li v-for="(item,index) in list" class="li border-1px" @click="playsong(index,item)">
                  <div :class="{'active':item.songname === song.songname}">
                    <span>{{index}}</span>
                    <span>{{item.songname}}</span>
                    <span>{{item.name}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "player",
  data() {
    return {
      playing: false,
      showFlag: true,
      list: [
        {
          songname: "songname",
          name: "name"
        }
      ],
      song: {
        songname: "songname",
        name: "name"
      },
      time:{
          start:0,
          end:0
      }
    };
  },
  // 组件
  components: {},
  // 计算属性
  computed: {},
  // 挂载后
  mounted() {},
  // 方法
  methods: {
    pre() {},
    togglePlay() {},
    next() {},
    showlist() {}
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus"  scoped>
border-1px($color) {
    position: relative;

    &:after {
        display: block;
        position: absolute;
        left: 0;
        bottom: 0;
        border-top: 1px solid $color;
        width: 100%;
        content: '';
    }
}

.musicsong-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 667px;
    z-index: 100;
    background: #ceacac;

    &.fade-enter-active, &.fade-leave-active {
        transition: all 0.2s linear;
        transform: translate3d(0, 0, 0);
    }

    &.fade-enter, &.fade-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
    }

    .menu-title {
        display: flex;
        border-1px(#ddd);

        .back {
            flex-basis: 40px;
            display: inline-block;

            img {
                margin-top: 12px;
                margin-left: 12px;
            }
        }

        .title-name {
            flex: 1;
            display: inline-block;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 18px;
            color: #fff;
        }

        .setting {
            flex-basis: 40px;
            display: inline-block;

            img {
                margin-top: 12px;
            }
        }
    }

    .rotate {
        .rotate-img {
            position: relative;
            width: 94px;
            margin: 0 auto;
            padding-left: 56px;
            z-index: 2;

            img {
                transition: all 0.3s;
                transform-origin: left top;
                -webkit-transform: rotate(-20deg);
                -moz-transform: rotate(-20deg);
                -ms-transform: rotate(-20deg);
                transform: rotate(-20deg);
            }

            &.cd-paly {
                img {
                    -webkit-transform: rotate(0deg);
                    -moz-transform: rotate(0deg);
                    -ms-transform: rotate(0deg);
                    transform: rotate(0deg);
                }
            }
        }

        .rotate-mid {
            position: relative;
            width: 290px;
            height: 290px;
            margin: -60px auto 0;
            background: url('../../static/img/cd_wrapper.png') no-repeat;
            background-size: 290px 290px;
            background-position: center center;
            z-index: 1;

            img {
                display: block;
                position: absolute;
                width: 195px;
                height: 195px;
                left: 50%;
                top: 50%;
                margin-top: -97px;
                margin-left: -97px;
                border-radius: 100%;
            }
        }
    }

    .bottom {
        width: 100%;
        margin-top: 60px;

        .menu {
            display: flex;
            margin-left: 30px;
            margin-right: 30px;

            span {
                flex: 1;
                display: inline-block;
                height: 60px;
                background-repeat: no-repeat;
                background-position: center center;
            }

            span:nth-child(1) {
                background-image: url('../../static/img/collect.png');
                background-size: 30px 30px;
            }

            span:nth-child(2) {
                background-image: url('../../static/img/down.png');
                background-size: 24px 24px;
            }

            span:nth-child(3) {
                background-image: url('../../static/img/chat.png');
                background-size: 24px 24px;
            }

            span:nth-child(4) {
                background-image: url('../../static/img/morew.png');
                background-size: 24px 24px;
            }
        }

        .progress {
            width: 60%;
            padding-left: 12%;
            padding-right: 12%;
            margin: 0 auto;
            position: relative;

            .time {
                span {
                    position: absolute;
                    top: 25%;
                    font-size: 12px;
                    opacity: 0.5;
                    color: #ffffff;
                }

                #cur {
                    left: 0;
                }

                #total {
                    right: 0;
                }
            }
        }

        .action {
            display: flex;

            span {
                flex: 1;
                display: inline-block;
                height: 60px;
                background-repeat: no-repeat;
                background-position: center center;

                &.isplay {
                    background-image: url('../../static/img/play.png');
                    background-size: 60px 60px;
                }

                &.noplay {
                    background-image: url('../../static/img/pause.png');
                    background-size: 60px 60px;
                }
            }

            span:nth-child(1) {
                background-image: url('../../static/img/seq.png');
                background-size: 60px 60px;
            }

            span:nth-child(2) {
                background-size: 34px 34px;
                background-image: url('../../static/img/pre_l.png');
            }

            span:nth-child(4) {
                background-image: url('../../static/img/pre_r.png');
                background-size: 34px 34px;
            }

            span:nth-child(5) {
                background-image: url('../../static/img/list.png');
                background-size: 60px 60px;
            }
        }
    }
}

.bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(60px);

    img {
        min-height: 667px;
    }
}

.tip {
    position: absolute;
    width: 200px;
    height: 100px;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -50px;
    background: #fff;
    z-index: 10000;
    border-radius: 5px;

    .content {
        border-1px(#ddd);
        color: #333;
        height: 70px;
        text-align: center;
        line-height: 70px;
        font-size: 14px;
    }

    .fun {
        text-align: center;
        color: #333;
        line-height: 30px;
        font-size: 14px;
    }
}

.list {
    .list-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 200;
        background: rgba(0, 0, 0, 0.4);

        &.fade-enter-active, &.fade-leave-active {
            transition: all 0.3s linear;
            opacity: 1;
        }

        &.fade-enter, &.fade-leave-active {
            opacity: 0;
        }
    }

    .list-song {
        width: 100%;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 201;
        background: rgba(255, 255, 255, 0.8);

        &.fold-enter-active, &.fold-leave-active {
            transition: all 0.2s linear;
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        &.fold-enter, &.fold-leave-active {
            transform: translate3d(0, 100%, 0);
            opacity: 0;
        }

        .title {
            width: 90%;
            margin: 0 auto;
            height: 50px;
            line-height: 50px;
        }

        .ul-song {
            max-height: 300px;
            overflow: hidden;

            li {
                padding-left: 10px;
                margin: 0 auto;
                height: 50px;
                line-height: 50px;

                .active {
                    span {
                        color: #d33a31;
                    }
                }

                span {
                    color: #333;
                }
            }
        }
    }
}

@keyframes rotating {
    0% {
        -webkit-transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(360deg);
    }
}

@keyframes rotating {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.cd-rotate {
    -webkit-animation: rotating 10s linear 0.3s infinite;
    animation: rotating 10s linear 0.3s infinite;
}
</style>