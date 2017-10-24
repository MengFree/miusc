<template>
    <div class="footMenu">
        <router-link class="item" tag="div" to="/">
            <div>
                <i class="icon ion-home"></i>
            </div>
            发现音乐
        </router-link>
        <!-- <div class="item">
            <div>
                <i class="icon ion-home"></i>
            </div>
            发现音乐
        </div> -->
        <div class="item">
            <div>
                <i class="icon ion-music-note"></i>
            </div>
            我的音乐
        </div>
        <div class="item">
            <div>
                <i class="icon ion-person-stalker"></i>
            </div>
            朋友
        </div>
        <div class="item">
            <div>
                <i class="icon ion-person"></i>
            </div>
            账号
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';
export default {
    name: 'footMenu',
    data() {
        return {

        }
    },
    // 组件
    components: {
        
    },
    // 计算属性
    computed: {},
    // 挂载后
    mounted(){},
    // 方法
    methods: {},
}
</script>
<style scoped lang='less'>
    .footMenu{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        background-color: rgba(56, 56, 58, 0.85);
        display: flex;
        .item{
            flex: 1;
            color: #a8a8aa;
            font-size: 12px;
            &.router-link-active{
                color: #fff;
            }
            .icon{
                padding: 4px 0 2px 0;
                font-size: 28px;
            }
        }
    }
</style>