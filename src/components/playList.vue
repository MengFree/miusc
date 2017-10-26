<template>
    <!-- <div class="playList"> -->
        <div v-if="detail" class="musicmenu-wrapper" key="musicmenu">
            <div class="menu-title" :style="{'background': 'rgba(7, 17, 27, '+ opacity +')'}">
                <div class="back" @click="goBack">
                    <img src="../../static/img/back.png" alt="" width=24 height=24>
                </div>
                <div class="title-name">
                  歌单
                </div>
                <router-link to="/player" tag="div" class="setting">
                  <img src="../../static/img/ph.png" alt="" width=24 height=24>
                </router-link>
                <!-- <div class="setting">
                    <img src="../../static/img/ph.png" alt="" width=24 height=24>
                </div> -->
            </div>
          <scroll :data="detail" >
            <div ref="menuWrapper" class="list-wrapper">
                    <header>
                        <div class="menu-user">
                        <div class="user-img" >
                            <img :src="detail.coverImgUrl" alt="" width="100%">
                        </div>
                        <div class="user-info">
                        <span>
                        {{detail.name}}
                        </span>
                            <div class="user-name">
                                <p>
                                    <img :src="detail.creator.avatarUrl" class="creator-avatar">
                                    {{detail.creator.nickname}}
                                </p>
                                <img src="../../static/img/arrows_right.png" alt="">
                            </div>
                        </div>
                        </div>
                        <div class="menu-info">
                        <ul class="info-ul">
                            <li>
                            <div class="info-img"></div>
                            <p>14633</p>
                            </li>
                            <li>
                            <div class="info-img"></div>
                            <p>434</p>
                            </li>
                            <li>
                            <div class="info-img"></div>
                            <p>80</p>
                            </li>
                            <li>
                            <div class="info-img"></div>
                            <p>下载</p>
                            </li>
                        </ul>
                        </div>
                        <div class="background">
                        <img :src="detail.coverImgUrl" alt="" width="100%" height="100%">
                        </div>
                    </header>
                    <div class="menu-list">
                        <div class="list-title">
                        <div class="img"></div>
                        <div class="title border-1px" @click="play()">
                            播放全部
                            <span>(共{{detail.trackCount}}首)</span>
                        </div>
                        <div class="menu border-1px"></div>
                        </div>
                        <ul class="list-ul">
                            <li v-for="(item, index) in detail.tracks" :key="item.id">
                                <div class="img" :class="{'active': number===index}">
                                {{index + 1}}
                                </div>
                            <div class="title border-1px" @click="play(item.id)">
                              <span class="music-name" :class="{'active': number===index}" >
                                  {{item.name}}
                              </span>
                              <p>
                                <i v-show="item.sq"></i>
                                <span :class="{'active': number===index}">{{item.artists[0].name}} - {{item.album.name}}</span>
                              </p>
                            </div>
                                <div class="menu border-1px" v-show="item.movie">
                                <div class="menu-img"></div>
                                </div>
                                <div class="menu border-1px">
                                    <span>
                                      <i class="icon ion-ios-more"></i>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
            </div>
          </scroll>
        </div>
    <!-- </div> -->
</template>

<script>
import { mapState, mapActions } from "vuex";
import scroll from "./base/scroll";
export default {
  name: "playList",
  data() {
    return {
      detail: null,
      number: null,
      opacity: 0.047
    };
  },
  // 组件
  components: {
    scroll
  },
  // 计算属性
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  // 挂载后
  mounted() {
    let id = this.$route.params.id;
    if (!id) return this.$router.push('/');
    // this.$api.getPlayDetail(id).then(res=>{
    //     console.log(res.data);
    // })
    this.$api.getDetail(id).then(res => {
      console.log(res.data);
      this.detail = res.data.result;
    });
  },
  // 方法
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    play(id){
      var list=this.detail.tracks;
      this.$store.dispatch('CHANGELIST',list).then(res=>{
        this.$set(this.detail,'tracks',res);
        id=id||list[0].id;
        this.playSong(id)
      })
    },
    playSong(id){
      this.$store.dispatch('PLAYSONG',id);
      this.$router.push('/player');
        console.log('play',id);
    },
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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

.musicmenu-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  z-index: 100;

  .scroll {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.2s linear;
    transform: translate3d(0, 0, 0);
  }

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .menu-title {
    position: fixed;
    width: 100%;
    top: 0;
    display: flex;
    z-index: 110;

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

  .list-wrapper {
    text-align: left;

    // position: absolute;
    // top: 0;
    // left: 0;
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
    header {
      position: relative;
      color: #fff;
      padding-top: 48px;
      overflow: hidden;
      background: rgba(7, 17, 27, 0.5);

      .menu-user {
        margin: 16px 20px 0 20px;
        display: flex;

        .user-img {
          flex-basis: 150px;
        }

        .user-info {
          padding-left: 10px;
          padding-right: 20px;
          flex: 1;

          span {
            display: block;
            margin-top: 20px;
            letter-spacing: 1px;
            line-height: 1.3;
          }

          .user-name {
            p {
              display: inline-block;
              vertical-align: top;
              line-height: 30px;
              height: 30px;
              font-size: 18px;

              .creator-avatar {
                border-radius: 50%;
              }
            }

            img {
              vertical-align: top;
              height: 24px;
              margin-top: 3px;
            }
          }
        }
      }

      .menu-info {
        .info-ul {
          margin-bottom: 8px;
          display: flex;

          li {
            flex: 1;

            .info-img {
              height: 48px;
              background-size: 24px 24px;
              background-repeat: no-repeat;
              background-position: center center;
            }

            p {
              text-align: center;
              line-height: 20px;
              font-size: 14px;
              color: #c2bebc;
            }
          }

          li:nth-child(1) {
            .info-img {
              background-image: url('../../static/img/list-3.png');
            }
          }

          li:nth-child(2) {
            .info-img {
              background-image: url('../../static/img/list-2.png');
            }
          }

          li:nth-child(3) {
            .info-img {
              background-image: url('../../static/img/list-1.png');
            }
          }

          li:nth-child(4) {
            .info-img {
              background-image: url('../../static/img/list-4.png');
            }
          }
        }
      }

      .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
      }
    }

    .menu-list {
      background: #fbfcfd;

      .list-title {
        display: flex;

        .img {
          flex-basis: 48px;
          height: 48px;
          background: url('../../static/img/start.png') no-repeat;
          background-position: center center;
          background-size: 24px 24px;
        }

        .title {
          flex: 1;
          line-height: 48px;
          font-size: 18px;
          border-1px(#ddd);

          span {
            font-size: 14px;
            color: #949494;
          }
        }

        .menu {
          flex-basis: 50px;
          height: 50px;
          background: url('../../static/img/menu.png') no-repeat;
          background-position: center center;
          background-size: 24px 24px;
          border-1px(#ddd);
        }
      }

      .list-ul {
        li {
          display: flex;

          .img {
            &.active {
              color: #d33a31;
            }

            flex-basis: 48px;
            text-align: center;
            line-height: 56px;
            color: #999999;
          }

          .title {
            flex: 1;
            border-1px(#ddd);

            .music-name {
              &.active {
                color: #d33a31;
              }

              line-height: 32px;
              font-size: 18px;
              color: #333;
            }

            p {
              font-size: 16px;
              color: #949494;

              i {
                display: inline-block;
                width: 16px;
                height: 16px;
                background-image: url('../../static/img/sq.png');
                background-position: center center;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                vertical-align: middle;
              }

              span {
                &.active {
                  color: #d33a31;
                }

                vertical-align: middle;
                font-size: 12px;
              }
            }
          }

          .menu {
            flex-basis: 48px;
            margin-top: 12px;
            border-1px(#ddd);
            position: relative;

            span {
              color: #949494;
              display: block;
              position: absolute;
              border-radius: 3px;
              top: 40%;
              left: 50%;
              transform: translate(-50%, -50%);
            }

            .menu-img {
              width: 36px;
              height: 26px;
              background-position: center center;
              background-size: 18px 18px;
              background-repeat: no-repeat;
              border: 1px solid #d3d4da;
              border-radius: 4px;
            }
          }

          .menu:nth-child(3) {
            .menu-img {
              background-image: url('../../static/img/aee.png');
            }
          }

          .menu:nth-child(4) {
            .menu-img {
              background-image: url('../../static/img/more.png');
            }
          }
        }
      }
    }
  }
}
</style>
