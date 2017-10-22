<template>
    <div class="home" style="width:100%;height:100%">
        <div class="search">
            <div class="yuyin"></div>
            <div class="input">
                <input type="text" value="" placeholder="搜索音乐、歌曲、电台" id="inputvalue">
            </div>
            <div class="music">
                <span v-show="lshow">取消</span>
                <img src="../assets/img/ph.png" alt="" >
            </div>
        </div>
       <div class="hello-wrapper" ref="helloWrapper">
            <div class="hello">
                <div class="swipe-wrapper">
                    <div class="my-swipe">
                        <div class="slide1">
                            <img src="../assets/img/1.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="cards border-1px">
                    <div class="card-li">
                        <div class="circle">
                        </div>
                        <p>私人FM</p>
                    </div>
                    <div class="card-li">
                        <div class="circle">
                        <span>20</span>
                        </div>
                        <p>每日歌曲推荐</p>
                    </div>
                    <div class="card-li">
                        <div class="circle">
                        </div>
                        <p>云音乐热歌榜</p>
                    </div>
                </div>
                <div class="music-list">
                    <ul class="list-ul">
                        <li>
                            <img src='../assets/img/logo.png' alt=""/>
                            <div class="item-content">
                                ddasddd
                            </div>
                        </li>
                        <li>
                            <img src='../assets/img/logo.png' alt=""/>
                            <div class="item-content">
                                ddasddd
                            </div>
                        </li>
                        <li>
                            <img src='../assets/img/logo.png' alt=""/>
                            <div class="item-content">
                                ddasddd
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';

export default {
  name: "home",
  data() {
    return {
      msg: "msg",
      data: [1, 2, 3, 4, 5, 6]
    };
  },
  // 组件
  components: {
    scroll
  },
  // 计算属性
  computed: {},
  // 挂载后
  mounted() {},
  // 方法
  methods: {
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

.hello-wrapper {
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
        border-1px(#ddd);

        .card-li {
            display: inline-block;
            width: 30%;
            margin-left: 2.5%;
            margin-top: 10px;
            margin-bottom: 10px;

            .circle {
                position: relative;
                width: 58%;
                margin: 0 auto;
                height: 0;
                padding-top: 58%;
                border-radius: 50%;
                border: 1px solid #d33a31;

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
                    color: #d33a31;
                }
            }

            p {
                color: #333;
                font-size: 10px;
                text-align: center;
                margin-top: 5px;
            }
        }

        .card-li:nth-child(1) {
            .circle {
                background: url('../assets/img/FM.png') no-repeat;
                background-size: 50px 50px;
                background-position: center;
            }
        }

        .card-li:nth-child(3) {
            .circle {
                background: url('../assets/ph.png') no-repeat;
                background-size: 50px 50px;
                background-position: center;
            }
        }
    }

    .music-list {
        .loading {
            width: 100px;
            height: 100px;
            margin: 10px auto 0 auto;

            img {
                -webkit-animation: rotating 3s linear 0.3s infinite;
                animation: rotating 3s linear 0.3s infinite;
            }
        }

        .list-ul li {
            /* float: left; */
            min-height: 154px;
            display: inline-block;
            width: 30%;
            margin-left: 2.5%;
            margin-bottom: 2.5%;
            box-sizing: border-box;
            vertical-align: top;

            img {
                width: 100%;
            }

            .item-content {
                height: 38px;
                word-wrap: break-word;
                overflow: hidden;
                display: -webkit-box;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 12px;
                color: #333;
                line-height: 1.5;
                letter-spacing: 1px;
            }
        }
    }
}

.search {
    background: #d43c33;
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

        input {
            width: 80%;
            height: 30px;
            border-radius: 5px;
            margin-top: 8px;
            color: #c6c7c9;
            font-size: 12px;
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
</style>