import axios from '../util/http';
import * as datas from './data'

export const getList = function() {
    return Promise.resolve(datas.playList);
}

export const getPlaylists = function() {
    // let url = '/proxy/playlist/list?cat=全部&order=hot&offset=0&limit=10';
    let url = '/api/playlist/list';
    let params = {
        cat: '全部',
        order: 'hot',
        offset: 0,
        limit: 6
    };
    return axios.get(url, {
        params: params
    })
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
    return axios({
        method: 'post',
        url: url,
        data: {
            ids: [id],
            br: 999000,
            csrf_token: ''
        }
    })
}

export const test = function() {
    // let url = '/proxy/playlist/list?cat=全部&order=hot&offset=0&limit=10';
    let url = '/163/api/playlist/list';
    let params = {
        cat: '全部',
        order: 'hot',
        offset: 0,
        limit: 6
    };
    return axios.get(url, {
        params: params
    })
}