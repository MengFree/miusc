import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const home = r => require.ensure([], () => r(require('../components/home')), 'home');
const music = r => require.ensure([], () => r(require('../components/base/home/music')), 'music');
const video = r => require.ensure([], () => r(require('../components/base/home/video')), 'video');
const radio = r => require.ensure([], () => r(require('../components/base/home/radio')), 'radio');
const playList = r => require.ensure([], () => r(require('../components/playList')), 'playList');
const player = r => require.ensure([], () => r(require('../components/player')), 'player');


Vue.use(Router);

export default new Router({
    mode: 'history', //路由模式
    strict: true,
    routes: [
        // {
        //     path: '/',
        //     name: 'Hello',
        //     component: HelloWorld,
        // },
        {
            path: '/',
            name: 'home',
            component: home,
            children: [{
                path: '/',
                component: music
            }, {
                path: '/video',
                component: video
            }, {
                path: '/radio',
                component: radio
            }, ]
        },
        {
            path: '/playList/:id',
            name: 'playList',
            component: playList
        },
        {
            path: '/player',
            name: 'player',
            component: player
        }
        // {
        //     path: '*',
        //     redirect: '/'
        // },
    ],
});