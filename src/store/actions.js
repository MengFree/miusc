import * as types from "./mutation-types.js"

export default {
    [types.SHIT]({ commit, state }, msg) {
        commit(types.SHIT, msg)
    },
    [types.LOADING]({ commit, state }, flag) {
        commit(types.LOADING, flag)
    },
    [types.TOGGLEPLAY]({ commit, state }, status) {
        commit(types.TOGGLEPLAY, status)
    }
}