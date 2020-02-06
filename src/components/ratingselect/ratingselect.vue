<template>
  <div class="ratingselect">
      <div class="rating-type">
          <span class="block positive"
            :class="{'active': selectType===2}"
            @click.stop.prevent="alterSelet(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span class="block positive"
          :class="{'active': selectType===0}"
          @click.stop.prevent="alterSelet(0,$event)">{{desc.positive}}<span class="count">{{recommendNum.length}}</span></span>
          <span class="block negative"
          :class="{'active': selectType===1}"
          @click.stop.prevent="alterSelet(1,$event)">{{desc.negative}}<span class="count">{{negativeNum.length}}</span></span>
      </div>
      <div class="switch" :class="{on:onlyContent}" @click.stop.prevent="alterContent">
          <span class="icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const EVENT_ALTERSELECT = 'alterSelect'
const EVENT_ALTERCONTENT = 'alertContent'

const VALUE_POSITIVE = 0
const VALUE_NEGATIVE = 1
export default {
    props: {
        // 评论页
        ratings: {
            type: Array,
            default() {
                return {}
            }
        },
        // 筛选条件
        selectType: {
            type: Number,
            default: 0
        },
        // 读取内容判定标识
        onlyContent: {
            type: Boolean,
            default: false
        },
        // 描述
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                };
            }
        }
    },
    computed: {
        recommendNum() {
            return this.ratings.filter(rating => {
                return rating.rateType === VALUE_POSITIVE
            })
        },
        negativeNum() {
            return this.ratings.filter(ratings => {
                return ratings.rateType === VALUE_NEGATIVE
            })
        }
    },
    methods: {
        // 修改标题样式
        alterSelet(type, event) {
            if (!event._constructed) {
                return
            }
            this.$emit(EVENT_ALTERSELECT, type)
        },
        // 只看有类容的
        alterContent() {
            this.$emit(EVENT_ALTERCONTENT, this.onlyContent)
        }
    }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin.styl';
@import 'common/stylus/variable.styl';
.ratingselect
    .rating-type
        padding 18px 0
        margin: 0 18px
        font-size 0
        border-1px($color-row-line)
        .block
            display inline-block
            padding 8px 12px
            margin-right 8px
            border-radius 1px
            line-height 16px
            font-size 12px
            color $color-grayBlack
            &.active
                color #fff
            .count
                font-size 8px
                margin-left 2px
            &.positive
                background $color-light-blue
                &.active
                    background $color-blue
            &.negative
                background $color-light-grayBlack
                &.active
                    background $color-grayBlack
    .switch
        padding 12px 18px
        line-height 24px
        border-bottom 1px solid $color-row-line
        color $color-gray
        font-size 0
        &.on
            .icon-check_circle
                color $color-green
        .icon-check_circle
            display inline-block
            vertical-align top
            font-size 24px
            margin-right 4px
        .text
            display inline-block
            vertical-align top
            font-size 12px
</style>
