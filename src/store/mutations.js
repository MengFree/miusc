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
}