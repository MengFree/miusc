<template>
    <div class="footMenu">
        footMenu
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
        height: 40px;
    }
</style>