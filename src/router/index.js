import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const home = r => require.ensure([], () => r(require('../components/home')), 'home');
const music = r => require.ensure([], () => r(require('../components/base/home/music')), 'music');
const video = r => require.ensure([], () => r(require('../components/base/home/video')), 'video');
const radio = r => require.ensure([], () => r(require('../components/base/home/radio')), 'radio');

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
        // {
        //     path: '*',
        //     redirect: '/'
        // },
    ],
});