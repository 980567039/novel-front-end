<template>
  <div id="categoriesList" class="flexContent">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="list"
    >
      <div v-for="(item, index) in novelList" :key="`novel${index}`" @click="toNovelInfo(item)">
        <div class="cover"> <van-image width="100" height="120" fit="cover" :src="item.cover" /> </div>
        <div class="text">
          <p>{{ item.name }}</p>
          <p>{{ item.author }}</p>
          <p class="van-multi-ellipsis--l3">{{ item.intro }}</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getNovelList } from '@/api'
export default {
  name:'',
  data(){
   return {
     page: 1,
     pageSize: 20,
     novelList: [],
     loading: true,
     finished: false,
   }
  },
  created() {
    this.getNovelList()
  },
  methods: {
    toNovelInfo(item) {
      this.$router.push({
        path: '/novelInfo',
        query: { id: item.id, title: item.name }
      })
      this.$route.meta.name = item.name
    },
    onLoad() {
      this.page += 1
      this.loading = true
      this.getNovelList()
    },
    getNovelList(){
      const id = this.$route.query.id
      getNovelList({ type: id, page: this.page, pageSize: this.pageSize }).then(res => {
        this.novelList = this.novelList.concat(res.list)
        if(this.novelList.length >= res.count) this.finished = true
        this.$nextTick(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
#categoriesList{
  overflow: scroll;
  .list{
    padding: 20px;
    >div{
      display: flex;
      padding-bottom: 10px;
      .text{
        padding-left: 15px;
        text-align: left;
        >p{
          margin: 10px 0;
          font-size: 14px;
        }
        >p:first-child{
          font-size: 18px;
        }
      }
    }
  }
}
</style>
