import Vue from 'vue'
import Router from 'vue-router'
const _import = require("./_import_" + process.env.NODE_ENV);
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', meta: { name: '书架' }, component: () => _import('views/BookCollect')},
    { path: '/bookCollect',  meta: { name: '书架' }, component: () => _import('views/BookCollect')},
    { path: '/categories',  meta: { name: '分类' }, component: () => _import('views/Categories'), children: [
      { path: '/list',  meta: { name: '' }, component: () => _import('components/CategoriesList')},
    ]},
    { path: '/search',  meta: { name: '' }, component: () => _import('views/Search')},
    { path: '/rank',  meta: { name: '排行' }, component: () => _import('views/Rank')},
    { path: '/search',  meta: { name: '搜索' }, component: () => _import('views/Search')},
  ]
})
