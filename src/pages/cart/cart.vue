<template>
    <view class="content">
        <view class="title">
            <text class="iconfont iconshop"></text>
            <text>优购生活馆</text>
        </view>
        <!-- 商品列表 -->
        <view class="goods-list">
            <view class="goods-item" v-for="(item, index) in cartList" :key="index">
                <text class="iconfont" :class="item.checked?'iconchecked':'iconunchecked'" @click="changeCheck(item)">
                </text>
                <image :src="item.goods_small_logo" alt="" />
                <view class="right">
                    <text class="text-line2">{{item.goods_name}}</text>
                    <view class="btm">
                        <text class="price">￥<text>{{item.goods_price}}</text>.00</text>
                        <view class="goods-num">
                            <button @click="subNum(item)">-</button>
                            <text>{{item.num}}</text>
                            <button @click="addNum(item)">+</button>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="account">
            <view class="select-all">
                <!--<text class="iconfont iconunchecked">-->
                <!--</text>-->
                <text class="iconfont" :class="isChecked ? 'iconchecked' :'iconunchecked'" @click="changeAllCheck">
                </text>
                <text>全选</text>
                <view class="price-wrapper">
                    <view class="price">
                        <text>合计:<text class="num">{{totalPrice}}.00</text></text>
                        <view class="info">包含运费</view>
                    </view>
                    <view class="account-btn">结算({{totalNum}})</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Hello',
        cartList:[]
      }
    },
    onLoad(){
      //  取出存储 的 Stoarge数据
      this.getCartList()
    },
    onShow(){
      console.log(this.totalNum)

      uni.setTabBarBadge({
        index:2,
        text: this.totalNum + ''
      })
    },
    onHide () {
      // 一旦 页面隐藏  ,把当前购物车的商品状态的Stoarge修改
      let cart = this.cartList.map(item => {
        return {
          goodsId: item.goodsId,
          num: item.num,
          checked: item.checked
        }
      })
      uni.setStorageSync('cart', cart)
    },
    methods: {
      changeAllCheck(){
      //  通过这个方法 修改 全选按钮状态
      //  全选 按钮的 计算属性就会修改 附带商品的状态
        this.isChecked = !this.isChecked
      },
      addNum(item){
      //  商品数量+1
        item.num++
      },
      subNum(item){
      //  商品数量-1
        if(item.num === 1) {
          uni.showToast({
            title:'商品无法再减少',
            icon:'none'
          })
          return false
        }
        item.num--
      },
      changeCheck (item) {
        // 点击后,取消勾选,或选择勾选
        item.checked = !item.checked
      },
      async getCartList(){
        // 获取购物车 数据
        let cart = uni.getStorageSync('cart')
        // 不存在则停止发送请求
        if(!cart) return false
        // 把id 遍历出去
          let arrId =  cart.map(item =>{
          return item.goodsId
        })
        // 根据id 发送数据请求
        const data = await this.$request({
          url:'/public/v1/goods/goodslist',
          data:{
            goods_ids:arrId.join(',')
          }
        })
        console.log(data)
        // 渲染到页面
        //   合并 购物车的状态数据 和 购物车的商品数据
        this.cartList = cart.map(item =>{
          let newData = data.find(val =>{
            console.log(item)
            console.log(val)
            return item.goodsId === val.goods_id
          })
          return {...item,...newData}
        })
        console.log(this.cartList)

      }
    },
    computed:{
      isChecked:{
        get(){
          // 是否全选
          // every 方法 循环 每个数据是否为true
          // 如果都为true 就返回ture ,有一个false返回false
          return this.cartList.every(item =>{
            return item.checked
          })
        },
        set(status){
        //  这个为 全选 被修改 时 会获取被修改的值
        //  通过修改的值 来改变 每个商品的 状态值
          return this.cartList.forEach(item =>{
            return item.checked = status
          })
        }
      },
      totalNum(){
       // 计算 总数量
       return this.cartList.reduce((sum,item) =>{
         // 循环每个 商品的数量
         // 利用 reduce 计算方法 求 选中商品的 数量累加
         return sum + (item.checked ? item.num : 0)
        },0)
      },
      totalPrice(){
        // 计算每个商品 的总价
        return this.cartList.reduce((sum,item) =>{
          // 循环每个 商品
          // 利用 reduce 计算方法 求 选中商品 的数量*商品单价的总和
          return sum + (item.checked ? (item.num * item.goods_price) : 0)
        },0)
      }
    }
  }
</script>

<style lang="less">
    .iconfont {
        font-size: 44rpx;
    }

    .title {
        height: 88rpx;
        display: flex;
        align-items: center;

        .iconfont {
            color: #999;
            margin: 6rpx 12rpx 0 32rpx;
        }
    }

    .goods-item {
        height: 206rpx;
        background-color: #fff;
        border-top: 1rpx solid #ddd;
        display: flex;
        box-sizing: border-box;
        align-items: center;

        .iconfont {
            color: #eb4450;
            margin: 0 30rpx;
        }

        image {
            width: 160rpx;
            height: 160rpx;
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            margin: 0 20rpx 0 18rpx;

            .btm {
                display: flex;
                margin-top: 40rpx;
                justify-content: space-between;

                .price {
                    color: #eb4450;

                    >text {
                        font-size: 24px;
                    }
                }

                .goods-num {
                    display: flex;
                    align-items: center;

                    button {
                        width: 60rpx;
                        height: 50rpx;
                        box-sizing: border-box;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 4rpx solid #666;
                    }

                    text {
                        margin: 0 30rpx;
                    }
                }
            }
        }
    }

    .goods-list {
        position: absolute;
        bottom: 98rpx;
        top: 88rpx;
        width: 100%;
        overflow: auto;
        padding-bottom: 60rpx;
        background-color: #f4f4f4;
    }

    .account {
        height: 98rpx;
        border-bottom: 1rpx solid #ddd;
        display: flex;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        align-items: center;

        .iconfont {
            color: #eb4450;
            margin: 0 30rpx;
        }

        .account-btn {
            width: 230rpx;
            height: 98rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background-color: #eb4450;
        }

        .select-all {
            flex: 1;
            display: flex;
            align-items: center;
            .price-wrapper {
                display: flex;
                flex: 1;
                justify-content: flex-end;
                align-items: center;
            }
        }

        .price {
            margin-right: 20rpx;

            .num {
                color: #eb4450;
            }

            .info {
                color: #999;
            }
        }
    }
</style>
