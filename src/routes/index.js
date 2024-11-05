import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('../views/Login.vue'); 
const Dashboard1 = () => import('../views/avisos.vue');
const Dashboard2 = () => import('../views/assembleia.vue');
const Dashboard3 = () => import('../views/Dashboard3.vue');
const ComingSoon = () => import('../views/encomendas.vue');

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
        },
        {
            path: '/avisos',
            name: 'Dashboard1',
            component: Dashboard1,
        },
        {
            path: '/assembleia',
            name: 'Dashboard2',
            component: Dashboard2,
        },
        {
            path: '/dashboard3',
            name: 'Dashboard3',
            component: Dashboard3,
        },
        {
            path: '/encomendas',
            name: 'ComingSoon',
            component: ComingSoon,
        }
    ]
});
