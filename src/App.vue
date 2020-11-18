<template>
  <div id="app">
    <!-- 导航条 -->
    <app-bar 
      @leftClick="close_return"
      @rightClick="showFunction"
      :showRight="true"
      :title="title" 
      :background="'#F0F1F1'">
    </app-bar>
    <transition :name="animate">
      <router-view></router-view>
    </transition>
    <van-tabbar v-show="showTabbar" v-model="active">
      <van-tabbar-item v-for="(item, index) in tabBar" :key="index" :to="item.path" :icon="item.icon"> {{ item.name }} </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      animate: "",
      active: 0,
      tabBar: [
        { name: '书架', path: '/bookCollect', icon: 'shop-collect' }, 
        { name: '分类', path: '/categories', icon: 'apps-o' }, 
        { name: '排行', path: '/rank', icon: 'chart-trending-o' },  
        { name: '搜索', path: '/search', icon: 'search' }
      ]
      
    }
  },
  computed: {
    ...mapState(['title']),
    showTabbar() {
      const hideTabList = ['/reade']
      return !hideTabList.includes(this.$route.path)
    }
  },
  watch: {
    $route(v, from) {
      this.animate = v.meta.index > from.meta.index ? "slide-left" : "slide-right";
      if(v.meta.name) {
        this.$store.commit('SET_STATE', { key: 'title', val: v.meta.name })
      }     
    },
  },
  methods: {
    close_return() {
      this.$router.go(-1)
    },
    showFunction() {}
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  will-change: transform;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
  width: 100%;
  height: 100%;
  position: fixed;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
html{
  overflow: hidden;
  height: 100%;
}
body{
  height: 100%;
}
#app{
  height: 100%;
}
.flexContent{
  height: 100%;
  padding: 50px 0;
  box-sizing: border-box;
}
</style>
