<template>
    <div class="list">
        <div class="music-list">
            <div class="title">
                <span>{{list.title}}<i class="icon ion-ios-arrow-right"></i></span>
            </div>
            <ul class="list-ul">
                <li v-for="(l,index) in list.playlists" :key="l.id" :class="{mid:((index+1)%3)==2}">
                    <img :src='l.coverImgUrl' alt=""/>
                    <div class="item-content">
                        {{l.name}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: "list",
  props: {
    list: {
      default: {
        title: "",
        playlists: []
      },
      type: Object
    }
  },
  data() {
    return {};
  },
  // 组件
  components: {},
  // 计算属性
  computed: {},
  // 挂载后
  mounted() {},
  // 方法
  methods: {}
};
</script>
<style scoped lang='less'>
.music-list {
  .title {
    padding: 10px 0 8px 0;

    .icon {
      padding-left: 4px;
    }

    span {
      display: block;
      border-left: 3px solid #d43a30;
      text-align: left;
      font-size: 16px;
      padding-left: 8px;
      height: 1.05em;
      line-height: 1.05em;
    }
  }

  .loading {
    width: 100px;
    height: 100px;
    margin: 10px auto 0 auto;

    img {
      width: 100%;
      min-height: 100px;
      -webkit-animation: rotating 3s linear 0.3s infinite;
      animation: rotating 3s linear 0.3s infinite;
    }
  }
  .list-ul {
    display: flex;
    flex-wrap: wrap;

    li {
      // flex : 1;
      min-height: 154px;
      display: inline-block;
      width: 33%;
      // margin-left: 2.5%;
      margin-bottom: 2.5%;
      box-sizing: border-box;
      vertical-align: top;

      &.mid {
        margin: 0 .5%;
      }

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
        text-align: left;
        padding: 0 5px;
      }
    }
  }
}
</style>