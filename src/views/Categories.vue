<template>
  <div id="categories" class="flexContent">
    <ul class="list">
      <li v-for="(item, index) in list" :key="`categories${index}`" @click="toList(item)" > <span>{{ item.name }}</span> </li>
    </ul>
  </div>
</template>

<script>
import { getNovelCategory } from '@/api'
export default {
  name:'',
  data(){
   return {
    list: []
   }
  },
  created() {
    this.getNovelCategory()
  },
  methods: {
    getNovelCategory() {
      getNovelCategory().then(res => {
        this.list = res.list
      })
    },
    toList(item) {
      this.$router.push({
        path: '/categories/list',
        query: { id: item.id, title: item.name }
      })
      this.$route.meta.name = item.name
    }
  }
}
</script>

<style lang='scss' scoped>
#categories{
  .list{
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    li{
      flex: 0 33.33%;
      padding-bottom: 10px;
      span{
        display: inline-block;
        width: 80%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        background: #eee;
        border-radius: 5px;
        &:active{
          background: rgb(226, 226, 226);
        }
      }
    }
  }
}

</style>
