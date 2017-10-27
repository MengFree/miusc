import Vue from 'vue'
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"


Vue.use(Vuex)

const state = {
    test: 'test msg',
    loading: 0,
    playList: [], //播放列表
    playing: false, //播放状态
    song: null, //播放音乐
    index: 0, //播放音乐在列表的位置
    playType: 'order', //播放顺序

}
export default new Vuex.Store({
    state,
    mutations,
    actions
})