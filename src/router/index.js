import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';

const home = r => require.ensure([], () => r(require('../components/home')), 'home');


Vue.use(Router);

export default new Router({
    mode: 'history', //路由模式
    strict: true,
    routes: [{
            path: '/',
            name: 'Hello',
            component: HelloWorld,
        },
        {
            path: '/home',
            name: 'home',
            component: home,
        },
    ],
});