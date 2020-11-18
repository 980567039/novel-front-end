<template>
  <div v-longtap="swipeup" v-tap="swipedown" id="reade" class="flexContent">
    <van-popup 
      v-model="showChapter"
      position="bottom"
      overlay-class="chapterOverlay"
      :style="{ height: '80%' }"
      :overlay-style="{ zIndex: '1999' }"
      class="chapterPopup"
    >
      <div class="chapterBox">
        <p>{{ $route.query.title }} <van-icon name="arrow" /> </p>
        <div class="chapterList">
          <div v-for="(chapter, index) in chapterList" :key="`chapter${index}`" class="van-hairline--top"> {{ chapter.title }} </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showTools" position="bottom" :overlay="false" :style="{ height: '8%' }">
      <div class="tools van-hairline--top">
        <div @click="showChapter = true"><van-icon name="wap-nav" /></div>
        <div><van-icon name="browsing-history-o" /></div>
        <div>A</div>
      </div>
    </van-popup>
    <div class="content">
      <p v-if="chapterData" class="title"> {{ chapterData.title }} </p>
      <p v-for="(item, index) in content.split(/[\n | \t | \s]+/)" :key="'content'+index">{{ item }}</p>
    </div>
    <!-- <van-swipe @change="change" :loop="false" class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(item, index) in arr" :key="'content'+index"> {{item}} </van-swipe-item>
    </van-swipe> -->
  </div>
</template>

<script>
import merge from 'webpack-merge';
import { getNovelChapter, getChapterContent } from '@/api'
export default {
  name:'',
  data(){
   return {
    page: 1,
    pageSize: 6000,
    chapterList: [],
    showTools: false,
    showChapter: false,
    chapterData: null,
    content: '',
   }
  },
  created() {
    this.getNovelChapter()
  },
  methods: {
    change(item) {
      console.log(this.index)
      console.log(item)
      this.index = item
    },
    getNovelChapter() {
      const id = this.$route.query.id
      getNovelChapter({ id: id, page: this.page, pageSize: this.pageSize }).then(res => {
        this.chapterList = this.chapterList.concat(res.data)
        if(this.$route.query.chapterId == null) {
          this.getChapterContent(this.chapterList[0].id)
          this.$router.push({query:merge(this.$route.query,{'chapterId': this.chapterList[0].id})})
          this.chapterData = this.chapterList[0]
          console.log(this.chapterData)
        }else{
          this.getChapterContent(this.$route.query.id)
        }
      })
    },
    swipedown() {
      this.showTools = false
    },
    swipeup() {
      this.showTools = true
    },
    getChapterContent(chapterId) {
      getChapterContent({chapterId: chapterId}).then(res => {
        this.content = res.data.content
        this.arr = this.contentSplitPiece(this.content)
      })
    },
    contentSplitPiece(content) {
      const pageSize = 1000
      let arr = []
      let piece = parseInt(this.content.length / pageSize)
      if(this.content.length % pageSize > 0) piece += 1
      for(let i=0; i<piece; i++) {
        const start = i * pageSize
        const end = (i + 1) * pageSize
        arr.push(content.slice(start, end))
      }
      return arr
    },
  }
}
</script>

<style lang='scss' scoped>
#reade{
  padding-bottom: 0;
  .chapterOverlay{
    z-index: 1999 !important;
  }
  .chapterPopup{
    z-index: 2000 !important;
    .chapterBox{
      padding: 10px 20px;
      p{
        font-size: 16px;
        text-align: left;
        margin: 10px 0;
        i{
          vertical-align: text-bottom;
        }
      }
      .chapterList{
        div{
          height: 35px;
          line-height: 35px;
          text-align: left;
        }
      }
    }
  }
  .tools{
    display: flex;
    padding-top: 10px;
    >div{
      flex: 1;
      font-size: 30px;
      i{
        font-size: 30px;
      }
    }
  }
  .content{
    padding: 15px;
    font-size: 16px;
    overflow: scroll;
    height: 100%;
    .title{
      font-size: 20px;
    }
    p{
      line-height: 25px;
      text-align: left;
    }
  }
  .my-swipe{
    height: 100%;
  }
}
</style>
