<template>
  <div id="novelInfo" class="flexContent">
    <div>
      <div class="info">
        <div> <van-image width="100" height="120" fit="cover" :src="data.cover" /> </div>
        <div class="text">
          <p>{{ data.name }}</p>
          <p>{{ data.author }}</p>
          <p class="van-multi-ellipsis--l3"></p>
        </div>
      </div>
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
        console.log(res)
      })
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
  }
}
</style>