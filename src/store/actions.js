import * as types from "./mutation-types.js"
import * as apis from "../api"

export default {
    [types.SHIT]({ commit, state }, msg) {
        commit(types.SHIT, msg)
    },
    [types.LOADING]({ commit, state }, flag) {
        commit(types.LOADING, flag)
    },
    [types.TOGGLEPLAY]({ commit, state }, status) {
        commit(types.TOGGLEPLAY, status)
    },
    [types.CHANGELIST]({ commit, state }, list) {
        return new Promise((resolve, reject) => {
            var ids = [];
            for (var i = 0; i < list.length; i++) {
                var song = list[i];
                if (!song.url) {
                    ids.push(song.id);
                }
            }
            if (ids.length) {
                apis.getSongUrl(ids.join(',')).then(res => {
                    console.log(res);
                    if (res.data.code !== 200) return reject(list);
                    var datas = res.data.data;
                    for (var k = 0; k < datas.length; ++k) {
                        for (var p = 0; p < list.length; p++) {
                            if (list[p].id == datas[k].id) {
                                list[p]['url'] = datas[k].url;
                                list[p]['datas'] = datas[k];
                            }
                        }
                    }
                    commit(types.CHANGELIST, list);
                    resolve(list);
                })
            } else {
                resolve(list);
                commit(types.CHANGELIST, list);
            }
        })
    },
    [types.PLAYSONG]({ commit, state }, id) {
        let list = state.playList;
        let song = null;
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                song = list[i];
                break;
            }
        }
        song && commit(types.PLAYSONG, song)
    },
}