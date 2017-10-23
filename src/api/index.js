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