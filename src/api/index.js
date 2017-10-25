import axios from '../util/http';
import * as datas from './data'
// import En from '../util/crypto'
// var En = require('../util/crypto')

export const getList = function() {
    return Promise.resolve(datas.playList);
}

export const getPlaylists = function() {
    // let url = '/proxy/playlist/list?cat=全部&order=hot&offset=0&limit=10';
    // let url = '/api/playlist/list';
    // let params = {
    //     cat: '全部',
    //     order: 'hot',
    //     offset: 0,
    //     limit: 6
    // };
    // return axios.get(url, {
    //     params: params
    // })
    let url = '/music/top/playlist/highquality?limit=30';
    return axios.get(url)
}

export const getPlayDetail = function(id) {
    // let url = '/proxy/playlist/list?cat=全部&order=hot&offset=0&limit=10';
    let url = '/api/playlist/detail';
    let params = {
        id
    };
    return axios.get(url, {
        params: params
    })
}
export const getDetail = function(id) {
    var res = {
        data: datas.playDetail
    }
    return Promise.resolve(res);
}

export const getSongUrl = function(id) {
    let url = '/163/weapi/song/enhance/player/url';
    // return axios.post(url, {
    //     ids: [id],
    //     br: 999000,
    //     csrf_token: ''
    // })
    var data = {
        ids: [id],
        br: 999000,
        csrf_token: ''
    };
    console.log(data);
    return axios({
        method: 'post',
        url: url,
        data: data
    })
}

export const test = function(id) {
    // let url = '/proxy/playlist/list?cat=全部&order=hot&offset=0&limit=10';
    let url = '/music/musicUrl?id=' + id;
    // let url = '/music/top/playlist/highquality?limit=30';
    return axios.get(url)
}