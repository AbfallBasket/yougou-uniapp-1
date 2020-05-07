<template>
    <view class="header">
        <input type="text"
               confirm-type="search"
               v-model="inputVal"
               @confirm="clickSearch">

        <icon class="search-icon"
              type="search"
              size="16">
        </icon>
        <icon class="clear-icon"
              type="clear"
              size="16"
              color="#ccc" v-show="inputVal" @click="clearVal">

        </icon>
    </view>
</template>

<script>
  export default {
    props: ['searchVal'],
    data () {
      return {
        // 接受 父组件传递 的 搜索框内容
        inputVal: this.searchVal
      };
    },
    methods: {
      clickSearch () {
        // 点击 完成 把 input 值传递给 父组件
        // 如果 input 值存在则 进行 传递
        if (this.inputVal) {
          // 给父组件传一个search事件，然后传当前的输入框的值
          this.$emit('search', this.inputVal)
        }
      },
      clearVal(){
        this.inputVal = ''
      }
    },
    watch: {
      searchVal (newValue) {
        // 监听器，进行监听 input值 是否发生 改变
        // 一旦发生 改变 则修改 input的值
        this.inputVal = newValue
      }
    }
  }
</script>

<style lang="less" scoped>
    .header {
        height: 120rpx;
        background-color: #eee;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            background-color: #fff;
            height: 60rpx;
            width: 720rpx;
            padding-left: 74rpx;
            box-sizing: border-box;
        }
        .search-icon {
            position: absolute;
            left: 44rpx;
        }

        .clear-icon {
            position: absolute;
            right: 44rpx;
            z-index: 100;
            left: auto;
        }
    }
</style>
