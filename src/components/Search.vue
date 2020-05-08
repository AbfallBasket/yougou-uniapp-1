<template>
    <view class="header" @click="toSearch">
        <view class="inner">
            <icon type="search" size="16">
            </icon>
            <text>搜索</text>
        </view>
    </view>
</template>

<script>
  export default {
    name: 'Search',
    methods:{
      toSearch(){
        console.log('dddd')
        uni.navigateTo({
          url:'/pages/search/index'
        })
      }
    }
  }
</script>

<style scoped lang="less">
    .header {
        height: 100rpx;
        background-color: #eb4450;
        padding: 20rpx 16rpx;
        box-sizing: border-box;
        .inner {
            background-color: #fff;
            border-radius: 4rpx;
            height: 60rpx;
            color: #bbb;
            display: flex;
            align-items: center;
            justify-content: center;
            icon {
                margin: 6rpx 16rpx 0 0;
            }
        }
    }
</style>
