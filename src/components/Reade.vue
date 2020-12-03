<template>
  <div @click.stop="swipedown" id="reade" class="flexContent">
    <van-popup 
      v-model="showChapter"
      position="bottom"
      overlay-class="chapterOverlay"
      :style="{ height: '80%' }"
      :overlay-style="{ zIndex: '1999' }"
      class="chapterPopup"
    >
      <div class="chapterBox">
        <div class="top">
          <p>{{ $route.query.title }} <van-icon name="arrow" /> </p>
          <p> <span v-if="isTop" @click.stop="scrollTop('bottom')"><van-icon name="down" /> 去底部</span> <span v-else  @click.stop="scrollTop('bottom')"><van-icon name="down" /> 去顶部</span></p>
        </div>
        <div class="chapterList">
          <div 
            v-for="(chapter, index) in chapterList" 
            @click.stop="toRead(chapter)"
            :key="`chapter${index}`"
            :class="{ 'active': chapter.index == $route.query.index }"
            class="van-hairline--top"> {{ chapter.title }} </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="showTools" position="bottom" :overlay="false" :class="readBackground" >
      <div class="setBackground">
        <div v-for="(item, index) in bgList" :key="'color'+index" class="item">
          <div @click.stop="setBackground(item)" :class="[{'active': item == readBackground}, item]" class="ball"></div>
        </div>
      </div>
      <div v-if="showFontSize" class="setFontSize">
        <van-slider v-model="fontSize" @change="fontSizeChange" :min="12" :max="30" :step="2" />
      </div>
      <div class="tools van-hairline--top">
        <div @click="showChapter = true"><van-icon name="wap-nav" /></div>
        <div><van-icon name="browsing-history-o" /></div>
        <div @click.stop="showFontSize = !showFontSize">A</div>
      </div>
    </van-popup>
    <div v-swipeleft="next" v-swiperight="prev" :class="`font-${readFontize} ${readBackground}`" id="content" class="content">
      <p v-if="chapterData" class="title"> {{ chapterData.title }} </p>
      <p v-for="(item, index) in content.split(/[\n | \t | \s]+/)" :key="'content'+index">{{ item }}</p>
      <p class="hasBottom"></p>
    </div>
    <!-- <van-swipe @change="change" :loop="false" class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(item, index) in arr" :key="'content'+index"> {{item}} </van-swipe-item>
    </van-swipe> -->
  </div>
</template>

<script>
import merge from 'webpack-merge';
import { Toast } from 'vant'
import { getNovelChapter, getChapterContent } from '@/api'
import { scrollTop } from '@/utils/index'
import { mapState } from 'vuex'
export default {
  name:'',
  data(){
   return {
    fontSize: null,
    chapterTitle: '',
    page: 1,
    pageSize: 6000,
    chapterList: [],
    showTools: false,
    showChapter: false,
    chapterData: null,
    content: '',
    isTop: true,
    showFontSize: false,
    bgList: ['gray', 'yellow', 'green', 'black']
   }
  },
  computed: {
    ...mapState(['readFontize', 'readBackground'])
  },
  created() {
    this.getNovelChapter()
    this.fontSize = this.readFontize
    console.log(this.fontSize)
  },
  methods: {
    setBackground(color) {
      this.$store.commit('SET_STATE', { key: 'readBackground', val: color })
    },
    fontSizeChange(value) {
      this.$store.commit('SET_STATE', { key: 'readFontize', val: value })
    },
    prev() {
      const index = this.$route.query.index - 0
      if(index <= 0) {
        Toast('到头了！')
        return
      }
      this.chapterData = this.chapterList[index - 1]
      this.getChapterContent(this.chapterList[index - 1].id)
      this.$router.push({query:merge(this.$route.query,{'index': index - 1})})
    },
    next() {
      const index = this.$route.query.index - 0
      if(index >= this.chapterList.length - 1) {
        Toast('看完了！')
        return
      }
      this.chapterData = this.chapterList[index - 1]
      this.getChapterContent(this.chapterList[index + 1].id)
      this.$router.push({query:merge(this.$route.query,{'index': index + 1})})
    },
    toRead(chapter) {
      this.$router.push({query:merge(this.$route.query,{'index': chapter.index})})
      this.chapterData = chapter
      this.getChapterContent(chapter.id)
      this.showChapter = false
    },
    scrollTop() {
      const el = document.querySelector('.chapterList')
      this.isTop = !this.isTop
      if(this.isTop) {
        scrollTop(el, 0, 200)
      } else {
        scrollTop(el, el.scrollHeight, 200)
      }
      
    },
    change(item) {
      this.index = item
    },
    getNovelChapter() {
      const id = this.$route.query.id
      getNovelChapter({ id: id, page: this.page, pageSize: this.pageSize }).then(res => {
        this.chapterList = this.chapterList.concat(res.data)
        if(this.$route.query.index == null) {
          this.getChapterContent(this.chapterList[0].id)
          this.$router.push({query:merge(this.$route.query,{'index': this.chapterList[0].index})})
          this.chapterData = this.chapterList[0]
        }else{
          const index = this.$route.query.index - 0
          this.chapterData = this.chapterList[index]
          this.getChapterContent(this.chapterList[index].id)
        }
      })
    },
    swipedown() {
      this.showTools = !this.showTools
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
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 10px 20px;
      box-sizing: border-box;
      .top{
        display: flex;
        p:first-child{
          font-size: 16px;
          text-align: left;
          margin: 10px 0;
          flex: 1;
          i{
            vertical-align: text-bottom;
          }
        }
        p:last-child{
          color: #3b84eb;
          i{
            vertical-align: text-top;
          }
        }
      }
      .chapterList{
        flex: 1;
        overflow: scroll;
        .active{
          color: #3b84eb;
          font-size: 14px;
        }
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
    .hasBottom{
      height: 54px;
    }
  }
  .setFontSize{
    height: 50px;
    padding: 25px 20px;
    box-sizing: border-box;
  }
  .setBackground{
    padding: 10px 20px;
    display: flex;
    .item{
      flex: 1;
      .ball{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 auto;
      }
      .active{
        box-shadow: 0 1px 5px 0;
      }
    }
  }
  .font-12{ font-size: 12px; }
  .font-14{ font-size: 14px; }
  .font-16{ font-size: 16px; }
  .font-18{ font-size: 18px; }
  .font-20{ font-size: 20px; }
  .gray{ background: ghostwhite; }
  .yellow{ background:#fffce2 }
  .green{ background:#cffdcf }
  .black{ background: #5f5f5f; color: #fff; }
  .my-swipe{
    height: 100%;
  }
}
</style>
