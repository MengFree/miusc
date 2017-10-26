import * as types from "./mutation-types.js"
export default {
    [types.LOADING](state, data) {
        if (data) {
            state.loading++
        } else {
            state.loading--
        }
    },
    [types.SHIT](state, msg) {
        state.test = msg
    },
    [types.TOGGLEPLAY](state, status) {
        state.playing = status
    },
    [types.CHANGELIST](state, list) {
        state.playList = list
    },
    [types.PLAYSONG](state, song) {
        state.song = song;
        state.playing = true;
    }
}