import Vue from 'vue'
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"


Vue.use(Vuex)

const state = {
    test: 'test msg',
    loading: 0,
    playList: [],
    playing: false,
    song: null,

}
export default new Vuex.Store({
    state,
    mutations,
    actions
})