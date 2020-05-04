<template>
    <view>
        <div class="header-wrapper">
            <!-- 头部 -->
            <SearchList @search="searchResult" :searchVal="query"/>

            <!-- 过滤菜单 -->
            <view  class="filter-menu">
                <view class="filter-list" :class="{ active: isActive === index }"
                      @click="changeActive(index)"
                      v-for="(item, index) in menuList"
                      :key="index">
                        {{ item }}
                </view>
            </view>
        </div>

        <!-- 商品列表 -->
        <view class="goods-list">
            <view class="goods"
                  v-for="(item, index) in searchList"
                  :key="index">
                <image :src="item.goods_big_logo"
                       alt="" />
                <view class="right">
                    <view class="goods-name text-line2">{{ item.goods_name }}</view>
                    <view class="price">
                        ￥
                        <text>{{ item.goods_price }}</text>
                        .00
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
  import SearchList from '@/components/SearchList'
  const PAGE = 10
  export default {
    name: 'searchList',
    components:{
      SearchList
    },
    data(){
      return{
        msg:'dd',
        // 是否 为选中 状态
        isActive:0,
        menuList:['综合','销量','价格'],
        // 搜索结果 列表
        searchList:[],
        // 搜索 的 关键字
        query:'',
        // 页面加载 时的 页码
        pagenum:1,
        // 页面数据 是否加载完毕
        isMaxTotal:false,
      //  页面数据 是否 在 请求中
        isRequest:false
      }
    },
    onLoad(options){
      console.log('页面加载时 触发')
      // 设置 加载数据中 为 false
      this.isRequest = false
    //  获取 传递过来的参数
      this.query = options.catName
      console.log(this.query)
      this.repeatReq()
    },
    onPullDownRefresh(){
      console.log('我下拉了')
    //  下拉 刷新 时 触发
      this.repeatReq()
      // 请求结束后,停止下拉动画
      uni.stopPullDownRefresh()
    },
    onReachBottom(){
      console.log('我上拉了')
    //  上拉 触低 时 触发
      this.pagenum++
      this.getSearchData(this.query)
    },
    methods:{
      repeatReq(){
        // 下拉刷新后,要清空 数据 ,否则会 存在数据存留BUG
        this.searchList = []
      //  由于 每次 加载 数据 都要 重置 所以集中写一个方法
        // 第一次页面加载  第一页
        this.pagenum = 1
        // maxTotal 也 变成可以继续加载
        this.isMaxTotal = false

        this.getSearchData(this.query)
      },
      searchResult(val){
      //  搜索框 回车后 进行  数据加载
        this.query = val

        this.repeatReq()
      },
    async  getSearchData(query){

       // 获取数据之前 判断 isMaxTotal
      // 如果为 true 说明已经加载完所有数据,停止发送请求
      if(this.isMaxTotal){
        uni.showToast({
          title:'一滴数据也没了'
        })
        return false
      }
      // 判断 是否true  如果true
      // 在加载数据中 则 停止 发送请求
      if(this.isRequest){
        uni.showToast({
          title:'数据请求中~~~'
        })
        return false
      }
       // 如果 是第一次 加载数据
       // 则设置 为 true 下次 请求数据时,如果上次数据还未
      // 加载 完毕,则会停止重复加载数据
      this.isRequest = true


       const data = await this.$request({
          url:'/public/v1/goods/search',
          data:{
            query,
            pagenum:this.pagenum,
            pagesize:PAGE
          }
        })
      if(data.goods.length !== 0){
        // 如果 数据存在则 获取并渲染
        this.searchList = [...this.searchList,...data.goods]
        console.log(this.searchList)
      //  每次 获取数据后 判断当前 的数据长度是否已经到达最大值
        if(this.searchList.length === data.total){
          this.isMaxTotal = true
        }
      //  请求 结束后 , 则说明 数据 已经加载完毕
      //  则 需要 设置为 false
        this.isRequest = false
      }else{
        uni.showToast({
          title:'没有搜索结果'
        })
      }


      },
      changeActive(index){
      //  点击 过滤栏 切换 active选中状态
        this.isActive = index

      }
    }
  }
</script>

<style lang="less">
  .header-wrapper {
      position: sticky;
      top: 0;
      background-color: #fff;
      z-index:100;
  }
    .header {
        height: 120rpx;
        padding: 30rpx 16rpx;
        box-sizing: border-box;
        background-color: #eee;
        position: relative;

        icon {
            position: absolute;
            top: 48rpx;
            left: 44rpx;
        }

        input {
            height: 60rpx;
            width: 100%;
            border-radius: 4rpx;
            background-color: #fff;
            padding-left: 80rpx;
            box-sizing: border-box;
        }
    }

    .top-header {
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        background-color: #fff;
    }
    .filter-menu {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100rpx;

        view.active {
            color: #eb4450;
        }
        .filter-list{
            text-align: center;
            line-height:100rpx ;
            flex:1;
            display: block;
            width: 100%;
            height: 100%;
        }
    }


    .goods {
        border-top: 1rpx solid #ddd;
        height: 260rpx;
        box-sizing: border-box;
        padding: 0 20rpx;
        display: flex;
        align-items: center;

        image {
            width: 200rpx;
            height: 200rpx;
        }

        .right {
            flex: 1;
            margin-left: 26rpx;

            .price {
                color: #eb4450;
                font-size: 24rpx;
                margin-top: 80rpx;

                text {
                    font-size: 36rpx;
                }
            }
        }
    }

    .btm-line {
        text-align: center;
    }
</style>
