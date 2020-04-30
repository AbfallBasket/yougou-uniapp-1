<template>
    <view>
        <!-- 搜索 子组件-->
        <Search></Search>

        <!-- 分类 列表-->
        <view class="content">
            <view class="left">
                <view :class="{active:active===index}" class="li" v-for="(item,index) in categoriesList" :key="index"
                @click="isActive(index)">
                    {{item.cat_name}}
                </view>
            </view>

            <view class="right">
                <image src="../../static/images/titleImage.png" mode=""></image>
                <!-- 二级分类 -->
                <view class="cate2" v-for="(item2,index2) in categoriesList[active].children" :key="index2">
                    <view class="title">
                        /
                        <text>{{item2.cat_name}}</text>
                        /
                    </view>

                    <!-- 分类 的 数据-->
                    <view class="cate3-wrapper">
                        <view class="cate3" v-for="(item3,index3) in item2.children" :key="index3">
                            <image :src="item3.cat_icon" mode=""></image>
                            <text>{{item3.cat_name}}</text>
                        </view>
                    </view>

                </view>
            </view>
        </view>
    </view>
</template>

<script>

  import Search from '@/components/Search'

  export default {
    components: {
      Search
    },
    data () {
      return {
        title: 'Hello',
        categoriesList:[],
        active:0
      }
    },
    onLoad () {
      // 获取分类 列表
      this.getCategories()

    },
    methods: {
      isActive(index){
        this.active = index
      },
    //
     async getCategories(){
        const data = await this.$request({
          url:'/public/v1/categories'
        })
       this.categoriesList = data
       console.log(data)
      }
    }
  }
</script>

<style lang="less">
    .content {
        display: flex;
        position: absolute;
        left:0;
        right:0;
        bottom:0;
        top:100rpx;
    }

    .left {
        width: 198rpx;
        overflow: scroll;
        .li{
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            border:1rpx solid #eee ;
            background-color: #f4f4f4;
            color: #333;
            &.active{
                color:#eb4450;
                background-color: #fff;
                position: relative;
                &::before{
                    position: absolute;
                    content:'';
                    height: 60rpx;
                    width: 8rpx;
                    background-color: #eb4450;
                    left:0;
                    top:20rpx;
                }
            }
        }
    }

    .right {
        flex: 1;
        overflow: scroll;
        >image{
            width: 520rpx;
            height: 180rpx;
            padding:20rpx 16rpx;
        }
    }

    .cate2{
        margin-bottom: 60rpx;
        .title{
            height: 110rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #e0e0e0;
            text{
                margin:0 30rpx;
                color: #333;
            }
        }
    }

    .cate3-wrapper{
        display: flex;
        flex-wrap: wrap;
        .cate3{
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 33.33%;
            margin-bottom: 10rpx;
            image{
                width: 120rpx;
                height: 120rpx;
            }
        }
    }

</style>
