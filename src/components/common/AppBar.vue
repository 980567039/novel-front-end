<template>
  <div id="appBar" class="header" :style="{ background: background }">
    <div @touchstart="leftClick" class="left">
      <van-icon size="20px" name="arrow-left" />
    </div>
    <div v-if="title" class="title">{{ title }}</div>
    <slot name="title"></slot>
    <div v-if="showRight"  @touchstart="rightClick" class="right">
      <span class="li365 icon-menu"></span>
    </div>
  </div>
</template>

<script>
export default {
	name: 'appBar',
	data() {
		return {}
	},
	props: {
		leftIcon: String, // 左边icon
		title: String, // 标题和slot不要一起传入
		background: String, // 背景颜色
		showRight: Boolean, // 是否显示右边按钮
	},
	created() {
	},
	methods: {
		leftClick() {
			this.$emit('leftClick')
		},
		rightClick() {
			this.$emit('rightClick')
		}
	},
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #fff;
  color: #5f5f5f;
  .left {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 0;
    top: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #5f5f5f;
      font-size: 18px;
    }
  }
  .right {
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #5f5f5f;
      font-size: 18px;
    }
  }
  .title {
    height: 50px;
    line-height: 50px;
    font-size: 18px !important;
    text-align: center;
    color: #5f5f5f;
    padding: 0 !important;
  }
}
</style>
