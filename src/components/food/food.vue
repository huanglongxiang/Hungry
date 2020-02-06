<template>
<transition name="foodEnter" @after-leave="afterLeave">
  <div class="food" v-show="visiblet">
      <cube-scroll ref="scrollContent">
      <!-- 图片区块 -->
      <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>
          </div>
      </div>
      <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
              <cartcontrol :food="food" class="food-cartcontrol" @addCircle="addCircle" ref="foodClick"></cartcontrol>
              <div class="addShopCar" v-show="!food.count" @click.stop="addFood">加入购物车</div>
          </div>
      </div>
      <split v-if="food.info"></split>
      <div class="content" v-if="food.info">
          <h1 class="title shopBar" >商品介绍</h1>
          <p class="foodBrief">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect
            :select-type="selectType"
            :only-content="onlyContent"
            :desc="desc"
            :ratings="food.ratings"
            @alterSelect="alterSelect"
            @alertContent="alertContent">
            </ratingselect>
            <div class="rating-wrapper">
                <ul v-if="computedRatings && computedRatings.length">
                    <li
                        v-for="(rating,index) in computedRatings"
                        :key="index" class="rating-item">
                        <div class="user">
                            <span class="name">{{rating.username}}</span>
                            <img class="avatar" :src="rating.avatar" width="12" height="12" alt="">
                        </div>
                        <div class="time">{{format(rating.rateTime)}}</div>
                        <p class="text">
                            <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                            {{rating.text}}
                        </p>
                    </li>
                </ul>
                <div class="no-rating" v-else>
                    暂无评价
                </div>
            </div>
      </div>
      </cube-scroll>
  </div>
  </transition>
</template>

<script>
import poplarmix from 'common/js/minpoplar.js'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import split from 'components/split/split.vue'
import ratingselect from 'components/ratingselect/ratingselect.vue'
import moment from 'moment'

const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'

let ALL = 2

export default {
  name: 'food',
  mixins: [poplarmix],
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: {
    food: {
        type: Object,
        default() {
            return {}
        }
    }
  },
  data() {
      return {
          selectType: ALL,
          onlyContent: true,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
      }
  },
  created() {
      // 显示时触发
      this.$on(EVENT_SHOW, () => {
          this.$nextTick(() => {
              this.$refs.scrollContent.refresh()
          })
      });
      // 初始化评论页表
      this.selectType = ALL;
      this.onlyContent = true;
  },
  computed: {
      // 单独抽离评论数组
      ratings() {
          return this.food.ratings
      },
      // 返回没有文本的评论
      computedRatings() {
          let ret = []
          this.ratings.forEach(rating => {
              // 过滤两个条件都有选择
              if (this.onlyContent && !rating.text) {
                  return
              }
              // 判定全部，与选中的
              if (this.selectType === ALL || this.selectType === rating.rateType) {
                  ret.push(rating)
              }
          })
          return ret
      }
  },
  methods: {
      // 添加食物
      addFood(event) {
          this.$refs.foodClick.addShop()
      },
      addCircle(el) {
          window.console.log(el)
          this.$emit(EVENT_ADD, el)
      },
      // 动画结束时隐藏副本
      afterLeave() {
          this.$emit(EVENT_LEAVE)
      },
      alterSelect(type) {
          this.selectType = type
      },
      alertContent(flag) {
          this.onlyContent = !flag
      },
      // 时间戳转换为正常时间
      format(time) {
          return moment(time).format('YYYY-MM-DD hh:mm')
      }
  }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable.styl'
@import 'common/stylus/mixin.styl'
.food
    position fixed
    width 100%
    top 0
    bottom 46px
    background #fff
    transition all 0.2s linear
    .shopChars
        position fixed
        bottom 0
    &.foodEnter-enter,&.foodEnter-leave-active
        transform translate3d(100%,0,0)
    &.foodEnter-enter-active,&.foodEnter-leave-active
        transition all 0.2s linear
    .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
        .back
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 10px
                font-size 20px
                color #fff
    .content
        padding: 18px
        min-height 80px
        .title
            line-height 14px
            margin-bottom: 8px
            font-size 14px
            font-weight 700
            color $color-black7
            &.shopBar
                font-weight normal
                margin-bottom 12px
        .foodBrief
            padding 0 8px
            line-height 24px
            color $color-grayBlack
            font-size 12px
        .detail
            font-size 10px
            color $color-gray
            line-height 10px
            margin-bottom 18px
            .sell-count
                margin-right 12px
        .price
            line-height 24px
            position relative
            overflow hidden
            .now
                color $color-red
                font-size 14px
                font-weight bold
                margin-right 12px
            .old
                color $color-gray
                font-size 10px
                font-weight bold
                text-decoration line-through
            .addShopCar
                padding 6px 12px
                font-size 10px
                color #fff
                float right
                border-radius 12px
                background $color-blue
                line-height 1
                position relative
                z-index 1
            .food-cartcontrol
                position absolute
                right 0
                top 0
                z-index 0
    .rating
        padding-top 18px
        .title
            line-height 14px
            margin-left 18px
            font-size 14px
            color $color-black7
        .rating-wrapper
            padding 0 18px
            .rating-item
                position relative
                padding 16px 0
                border-1px($color-row-line)
                .user
                    position absolute
                    right 0
                    top 16px
                    font-size 0
                    line-height 12px
                    .name
                        display inline-block
                        vertical-align top
                        font-size 10px
                        color $color-gray
                        margin-right 6px
                    .avatar
                        display inline-block
                        vertical-align top
                        border-radius 50%
                .time
                    margin-bottom 6px
                    line-height 12px
                    font-size 12px
                    color $color-gray
                .text
                    line-height 16px
                    font-size 12px
                    color $color-black7
                    .icon-thumb_up,.icon-thumb_down
                        margin-right 4px
                        line-height 12px
                        font-size 12px
                    .icon-thumb_up
                        color $color-blue
                    .icon-thumb_down
                        color $color-gray
            .no-rating
                padding 16px 0
                color $color-gray
                font-size 12px
</style>
