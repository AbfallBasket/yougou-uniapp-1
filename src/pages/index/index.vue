<template>
    <view class="index">
        <h1 class="my">我的首页</h1>

        <view>
            我是titile{{title}}
        </view>
        <view>
            {{person.name}}
            {{person.age}}
            ${{money}}
            {{cnMoney}}
            {{isRed}}
        </view>

        <view v-for="(item,index) in list" :key="item.id">
            {{item.id}} ----{{item.text}}
        </view>

        <view v-for="item in filterList" :key="item.id">
            {{item.text}}
        </view>

        <!-- uni 事件-->
        <view @click="handClick(1,$event)">
            点我触发事件
        </view>
        <view @click="handClick(2,$event)" data-index="22">
            点我触发事件
        </view>
        <view>
            我是自定义组件 图片
            <imgBox></imgBox>
        </view>
    </view>
</template>

<script>

  // 引入自定义组件
  import imgBox from '../../components/son'

  export default {
    components: {
      imgBox
    },
    data () {
      return {
        title: 'Hello',
        money: 1000,
        isRed: false,
        person: {
          name: 'zz',
          age: 18
        },
        list: [
          {
            id: 0,
            text: 'banna'
          },
          {
            id: 1,
            text: 'apple'
          },
          {
            id: 2,
            text: 'lemon'
          }
        ]
      }
    },
    onLoad () {

    },
    methods: {
      handClick (val, e) {
        console.log('你点击了我')
        console.log(val)
        console.log(e)
      }
    },
    //  计算属性
    computed: {
      cnMoney () {
        return '￥' + this.money
      },
      // 一个过滤器 方法
      filterList () {
        //  过滤掉 id>0
        return this.list.filter(v => v.id <= 0)
      }
    },
  }
</script>

<style lang="less">
    .index {
        .my {
            color: pink;
        }
    }
</style>
