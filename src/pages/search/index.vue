<template>
    <view class="wrapper">
        <SearchList @search="toSearchList"/>
        <view class="history-search">
            <view class="title">
                <text class="title">历史搜索</text>
                <icon type="clear"
                      size="18"
                @click="clearHistory">
                </icon>
            </view>
            <view>
                <view v-for="(item,index) in keyList" :key="index" @click="keyToSearchList(item)">
                    {{item}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
  import SearchList from '../../components/SearchList'

  const KEY_LIST = 'key_list'
  export default {
    name: 'index',
    data () {
      return{
        msg:'dd',
        keyList:[]
      }
    },
    components: {
      SearchList
    },
    onShow(){
      // 显示或隐藏时 触发 获取storage的数据
      this.keyList = uni.getStorageSync(KEY_LIST) || []
    },
    methods: {
      clearHistory(){
      //  清空历史 记录
        uni.showModal({
          title:'警告',
          content:'是否清空历史记录',
          success: (res) =>{
            console.log(res)
            if(res.confirm){
            //  清楚历史记录
              this.keyList = []
              uni.removeStorageSync(KEY_LIST)
            }
          }
        })
      },
      keyToSearchList(key){
        // 点击历史 搜索
        this.toSearchList(key)
      },
      toSearchList (key) {

        // 搜索内容 从头部开始,去重复
        let tempKeyList = [key,...this.keyList]
        tempKeyList = [...new Set(tempKeyList)]

        // 保存到 Storage中
        uni.setStorageSync(KEY_LIST,tempKeyList)

        setTimeout(()=>{
          //  跳转到 搜索列表页面
          uni.navigateTo({
            url: `/pages/search_list/search_list?catName=${key}`
          })
        })
      }
    }
  }
</script>

<style lang="less">
    .search {
        background-color: #eee;
        padding: 30rpx 15rpx;
        display: flex;
        justify-content: space-between;
        font-size: 28rpx;
        position: relative;
        icon {
            position: absolute;
            top: 50rpx;
            left: 38rpx;
        }
        input {
            height: 60rpx;
            flex: 1;
            background-color: #fff;
            padding-left: 70rpx;
            box-sizing: border-box;
            border-radius: 4rpx;
        }
        button {
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            border-radius: 8rpx;
            font-size: 28rpx;
            border: 1rpx solid #bfbfbf;
            background-color: #eee;
            margin-left: 20rpx;
        }
    }

    .history-search {
        color: #333;
        font-size: 28rpx;
        padding: 30rpx 30rpx 30rpx 15rpx;
        .title {
            display: flex;
            justify-content: space-between;
        }

        view {
            display: flex;
            flex-wrap: wrap;
            margin-top: 30rpx;
            view {
                height: 64rpx;
                line-height: 64rpx;
                padding: 0 26rpx;
                background-color: #ddd;
                margin: 0 30rpx 16rpx 0;
            }
        }
    }
</style>
