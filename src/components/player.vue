<template>
<transition name="player-transition"  enter-active-class="animated fadeInUp" leave-active-class=" animated fadeOutDown">
    <div class="musicsong-wrapper" key="musicsong" v-if="song">
      <div class="scroll-warpper">
        <div class="menu-title border-1px">
          <div class="back" @click="back">
            <img src="../../static/img/back.png" alt="" width=24 height=24>
          </div>
          <div class="title-name">
            {{song.name}}
            <br />
            <p>{{singer}}</p>
          </div>
          <div class="setting" >
            <img src="../../static/img/list-1.png" alt="" width=24 height=24>
          </div>
        </div>
        <div class="rotate">
          <div class="rotate-img" :class="{'cd-paly':playing}">
            <img src="../../static/img/stick_bg.png" alt="" height=140 >
          </div>
          <div class="rotate-mid" :class="{'cd-rotate':playing}">
            <img :src="song.album.picUrl" alt="">
          </div>
        </div>
        <div class="bottom">
          <div class="menu">
            <span><i class="icon ion-ios-heart-outline"></i></span>
            <span><i class="icon ion-ios-download-outline"></i></span>
            <span><i class="icon ion-ios-chatbubble-outline"></i></span>
            <span><i class="icon ion-android-more-vertical"></i></span>
          </div>
          <div class="progress">
            <progressslider :mwidth="mwidth" @change="setTime"></progressslider>
            <div class="time">
              <span id="cur">{{time.start}}</span>
              <span id="total">{{time.end}}</span>
            </div>
          </div>
          <div class="action">
            <span class="order">
                <i class="icon ion-ios-reload"></i>
            </span>
            <span @click="changeSong(false)" class="nextBtn preBtn">
                <i class="icon ion-ios-play-outline"></i>
            </span>
            <span @click="togglePlay()" class="playBtn">
                <i class="icon" :class="{'ion-ios-pause':playing,'ion-ios-play':!playing}"></i>
            </span>
            <span @click="changeSong(true)" class="nextBtn">
                <i class="icon ion-ios-play-outline"></i>
            </span>
            <span @click="showlist"></span>
          </div>
        </div>
      </div>
      <div class="bg">
        <img :src="song.album.blurPicUrl" alt="" width="100%" height="100%">
      </div>
      
      <!-- <div class="tip" v-show="tipshow">
        <div class="content">
          歌曲加载错误！
        </div>
        <div class="fun" @click="tipshow = !tipshow">
          确定
        </div>
      </div> -->
      <transition name="list-transition"  enter-active-class="animated fadeInUp" leave-active-class=" animated fadeOutDown">
      <div class="list" v-show="showAction">
        <transition name="list-bg-transition" enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">
          <div class="list-bg"  @click="showlist"></div>
        </transition >
        <transition name="list-song-transition"  enter-active-class="animated fadeInUp" leave-active-class=" animated fadeOutDown">
          <div class="list-song" v-show="showAction">
            <div class="title  border-1px">清空</div>
            <scroll ref="songlistWrapper" :data="playList" class="ul-song">
              <ul>
                <li v-for="(item,index) in playList" :key="item.songname" class="li border-1px" >
                  <div class="list-content" :class="{'active':song&&item.id === song.id}">
                    <i class="icon ion-volume-medium"></i>
                    <span>{{item.name}}</span>
                    -
                    <span class="list-name">{{getSinger(item)}}</span>
                  </div>
                </li>
              </ul>
            </scroll>
            <div class="title"  @click="showlist">关闭</div>
          </div>
        </transition>
      </div>
      </transition>
      <div class="">
        <audio ref="audio" :src="song.url" id="audioPlay" @canplay="canPlaySong" preload
               @timeupdate="updateTime" @error="playError" @ended="playend"
        ></audio>
      </div>
    </div>
</transition>
</template>
<script>
import { mapState, mapActions } from "vuex";
import progressslider from "./base/progressslider";
import scroll from './base/scroll'
export default {
  name: "player",
  beforeCreate() {
    console.log(this.$store.state);
    if (!this.$store.state.song) {
      return this.$router.push("/");
    }
  },
  data() {
    return {
      //   playing: true,
      showFlag: true,
      showAction: true,
      list: [
        {
          songname: "songname",
          name: "name"
        }
      ],
      time: {
        start: "00:00",
        end: "00:00"
      },
      mwidth: 0
    };
  },
  // 组件
  components: {
    progressslider,
    scroll,
  },
  // 计算属性
  computed: {
    ...mapState(["playing", "playList", "song", "playType"]),
    singer: function() {
      var name = [];
      if (this.song && this.song.artists) {
        for (var i = 0; i < this.song.artists.length; i++) {
          name.push(this.song.artists[i].name);
        }
      }
      return name.join("/");
    }
  },
  // 挂载后
  mounted() {
      if (!this.$store.state.song) {
      return this.$router.push("/");
    }
    if (this.playing) {
      var that = this;
      this.$refs.audio.load();
      setTimeout(function() {
        that.canPlaySong();
      }, 1000);
    }
  },
  // 方法
  methods: {
    back() {
      this.$router.go(-1);
    },
    getSinger(song) {
        var name = [];
        if (song && song.artists) {
            for (var i = 0; i < song.artists.length; i++) {
            name.push(song.artists[i].name);
            }
        }
        return name.join("/");
    },
    pre() {},
    togglePlay(stop) {
      if (stop) {
        return this.$store.commit("TOGGLEPLAY", false);
      }
      this.$store.commit("TOGGLEPLAY", !this.playing);
      this.$nextTick(function() {
        if (!this.playing) {
          this.$refs.audio.pause();
          console.log("pause");
        } else {
            this.$refs.audio.play().catch(e=>{
                this.$store.commit("TOGGLEPLAY", false)
            });
          console.log("play");
        }
      });
    },
    changeSong(n) {
      let list = this.playList;
      let song = this.song;
      if (this.playType === "order") {
        for (var i = 0; i < list.length; i++) {
          var s = list[i];
          if (s.id == song.id) {
            break;
          }
        }
        if (n) {
          i++;
        } else {
          i--;
        }
        if (i < list.length && i >= 0) {
          this.$store.dispatch("PLAYSONG", list[i].id);
          this.time={
          start:'00:00',
          end:'00:00'
      }
          this.$nextTick(function() {
            // this.canPlaySong();
            this.$refs.audio.load()
          });
        } else {
          this.togglePlay(true);
        }
      }
    },
    showlist() {
        this.showAction=!this.showAction;
    },
    playError() {
      console.log("playErrorplayErrorplayErrorplayError");
      this.$store.commit("TOGGLEPLAY", false);
    },
    updateTime() {
      //   var myaudio = document.getElementById("audioPlay");\
      var myaudio = this.$refs.audio;
      var time = parseInt(myaudio.currentTime);
      var timelength = myaudio.duration;
      if (isNaN(timelength)) {
        this.tipshow = true;
      } else {
        this.tipshow = false;
        this.mwidth = time / timelength * 100;
        this.time.start = this.changeTime(time);
        this.time.end = this.changeTime(timelength);
        if (timelength === time) {
          this.togglePlay();
        }
      }
    },
    playend: function() {
      console.log("over");
      // this.$store.commit("TOGGLEPLAY", false);
      this.time={
          start:'00:00',
          end:'00:00'
      }
      this.changeSong(true);
    },
    canPlaySong() {
      var that = this;
      if (this.song.url) {
        var myaudio = this.$refs.audio;
        myaudio.play();
        that.$store.commit("TOGGLEPLAY", true);
        // console.log("addEventListener");
        // myaudio.removeEventListener("ended", this.playend, false);
        // myaudio.addEventListener("ended", this.playend, false);
      }
    },
    changeTime(time) {
      var minute = parseInt(time / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }
      var secound = parseInt(time % 60);
      if (secound < 10) {
        secound = "0" + secound;
      }
      return minute + ":" + secound;
    },
    setTime(value) {
      var myaudio = document.getElementById("audioPlay");
      var timelength = myaudio.duration;
      myaudio.currentTime = timelength * value / 100;
    }
  }
};
</script>
<style  lang="stylus" rel="stylesheet/stylus"  scoped>
$Bcolor = rgba(254, 254, 254, 0.8);

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
.border-1px
    border-1px( rgba(162, 157, 163, 0.4))
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
        border-1px(rgba(226, 226, 226, 0.18));

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
            line-height: 30px;
            text-align: center;
            font-size: 18px;
            color: #fff;

            p {
                font-size: 12px;
                line-height: 10px;
            }
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
                line-height: 60px;
                color: $Bcolor;
                background-repeat: no-repeat;
                background-position: center center;

                .icon {
                    font-size: 30px;
                }
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
                color: $Bcolor;

                &.playBtn {
                    .icon {
                        box-sizing: border-box;
                        width: 40px;
                        height: 40px;
                        line-height: 38px;
                        font-size: 30px;
                        text-align: center;
                        border: 1px solid $Bcolor;
                        border-radius: 20px;
                        margin-top: 10px;
                        padding-left: 1px;

                        &.ion-ios-play {
                            padding-left: 3px;
                        }
                    }
                }

                &.nextBtn {
                    .icon {
                        font-size: 35px;
                        border-right: 2px solid $Bcolor;
                        margin-top: 20px;
                        height: 23px;
                        line-height: 23px;

                        &::before {
                            margin-top: -7px;
                        }
                    }

                    &.preBtn {
                        transform: rotate(180deg);
                    }
                }

                &.order {
                    padding-top: 10px;

                    .icon {
                        font-size: 35px;
                    }
                }

                // &.isplay {
                // background-image: url('../../static/img/play.png');
                // background-size: 60px 60px;
                // }
                &.noplay {
                    background-image: url('../../static/img/pause.png');
                    background-size: 60px 60px;
                }
            }

            // span:nth-child(1) {
            // background-image: url('../../static/img/seq.png');
            // background-size: 60px 60px;
            // }

            // span:nth-child(2) {
            // background-size: 34px 34px;
            // background-image: url('../../static/img/pre_l.png');
            // }

            // span:nth-child(4) {
            // background-image: url('../../static/img/pre_r.png');
            // background-size: 34px 34px;
            // }
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
            transition: all 1.5s linear;
            opacity: 1;
        }

        &.fade-enter, &.fade-leave-to {
            transition: all 1.5s linear;
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

        &.fold-enter-active, &.fold-leave-active  {
            transition: all 0.2s linear;
        }
        &.fold-enter-to,&.fold-leave{
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }    
        &.fold-enter, &.fold-leave-to {
            transform: translate3d(0, 100%, 0);
            opacity: 0;
        }

        .title {
            width: 100%;
            margin: 0 auto;
            height: 50px;
            line-height: 50px;
        }

        .ul-song {
            max-height: 300px;
            overflow: hidden;
            text-align left
            li {
                padding-left: 10px;
                margin: 0 auto;
                height: 50px;
                line-height: 50px;
                .list-content{
                    width: 100%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .list-name{
                    font-size 14px
                    color #999999    
                }
                .icon {
                    display none    
                }
                .active {
                    .icon {
                        display inline-block
                        color #d33a31
                    }
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