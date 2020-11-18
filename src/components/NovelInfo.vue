<template>
  <div id="novelInfo" class="flexContent">
    <div>
      <div class="info">
        <div> <van-image width="100" height="120" fit="cover" :src="data.cover" /> </div>
        <div class="text">
          <p> {{ data.name }} </p>
          <p> {{ data.author }} </p>
          <p> {{ data.timeago }} |  {{ data.type }}</p>
        </div>
      </div>
      <div @click="toReade" class="toRead">开始阅读</div>
      <p class="intro"> {{ data.intro }} </p>
    </div>
  </div>
</template>

<script>
import { getNovelInfo } from '@/api'
export default {
  data() {
    return {
      data: {}
    }
  },
  created() {
    this.getNovelInfo()
  },
  methods: {
    getNovelInfo() {
      const id = this.$route.query.id
      getNovelInfo({ id: id }).then(res => {
        this.data = res.data
      })
    },
    toReade() {
      this.$router.push({
        path: '/reade',
        query: { id: this.data.id, title: this.data.name, chapterId: null}
      })
      this.$route.meta.name = this.data.name
    }
  }
}
</script>

<style lang="scss">
#novelInfo{
  >div{
    padding: 20px;
    .info{
      display: flex;
      .text{
        padding-left: 15px;
        text-align: left;
        font-size: 16px;
      }
    }
    .toRead{
      width: 100px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      border-radius: 5px;
      text-align: center;
      margin: 20px auto 0;
      font-size: 14px;
      background: #609aeb;
    }
    .intro{
      color: #000;
      font-size: 16px;
      text-align: left;
      height: 30px;
      line-height: 30px;
      font-weight: 500;
    }
  }
}
</style>