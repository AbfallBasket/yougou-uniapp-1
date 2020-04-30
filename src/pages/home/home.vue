<template>
    <view>
        <!-- 搜索子组件-->
        <Search></Search>
        <!-- 轮播图 -->
        <swiper indicator-dots
                circular autoplay indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#fff">
            <block v-for="item in swiperList" :key="item.id">
                <swiper-item>
                    <image :src="item.image_src"></image>
                </swiper-item>
            </block>
        </swiper>
        <!-- 导航 -->
        <view class="nav">
            <image v-for="(item, index) in catitemList"
                   :key="index"
                   :src="item.image_src"
                   alt=""></image>
        </view>
        <!-- 楼层 -->
        <view>
            <view class="floor"
                  v-for="(item, index) in floordata"
                  :key="index">
                <image :src="item.floor_title.image_src"
                       alt=""></image>

                <view class="product_list">
                    <image :src="item.product_list[0].image_src"
                           alt=""></image>
                    <view class="right">
                        <block v-for="(item,index) in item.product_list"
                               :key="index">
                            <image v-if="index > 0"
                                    :src="item.image_src"
                                    alt=""></image>
                        </block>

                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import Search from '@/components/Search'
  // import { request } from '../../utils/request'

  export default {
      components:{
        Search
      },
    data () {
      return {
        title: 'Hello',
        swiperList:[],
        catitemList:[],
        floordata:[]
      }
    },
    onLoad () {
      //    页面加载 获取 页面数据 渲染

      // 轮播图 数据
      this.getSwipers()
    //  导航 数据
      this.getCatitems()
    //  楼层 数据
      this.getFloordata()
    },
    methods: {
     async getSwipers () {
        const data = await this.$request({
          url:'/public/v1/home/swiperdata'
        })
       this.swiperList = data
      },
      async getCatitems(){
        const data = await this.$request({
          url:'/public/v1/home/catitems'
        })
        this.catitemList = data
      },
     async getFloordata(){
        const data = await this.$request({
          url:'/public/v1/home/floordata'
        })
        this.floordata = data
      }
    }
  }
</script>

<style scoped lang="less">
    swiper {
        height: 340rpx;
        image {
            width: 100%;
            height: 340rpx;
        }
    }

    .nav {
        display: flex;
        height: 194rpx;
        justify-content: space-around;
        align-items: center;
        image {
            width: 128rpx;
            height: 140rpx;
        }
    }

    .floor {
        padding: 20rpx 17rpx 0;
        > image {
            height: 88rpx;
            width: 100%;
        }
    }

    .product_list {
        display: flex;
        > image {
            width: 232rpx;
            height: 386rpx;
        }
        .right {
            flex: 1;
            font-size: 0;
            > image {
                width: 232rpx;
                height: 188rpx;
                margin: 0 0 10rpx 10rpx;
            }
        }
    }
</style>
