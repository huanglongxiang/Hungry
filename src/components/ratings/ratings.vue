<template>
  <cube-scroll ref="scrollContent">
    <div class="ratings">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{data.seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{data.seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="data.seller.serviceScore"></star>
            <span class="score">{{data.seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="data.seller.foodScore" class="star"></star>
            <span class="score">{{data.seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{data.seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <div>
        <ratingselect
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
        @alterSelect="alterSelect"
        @alertContent="alertContent"></ratingselect>
      </div>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating, index) in computedRatings" :key="index" class="rating-item">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28" />
            </div>
            <div class="content">
              <h1 class="name">
                <span class="username">{{rating.username}}</span>
                <span class="rateTime">{{format(rating.rateTime)}}</span>
              </h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score" class="star"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text" v-show="rating.text">{{rating.text}}</p>
              <div class="recommend">
                <span
                  :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"
                ></span>
                <span
                  class="recomend-value"
                  v-show="rating.recommend && rating.recommend.length"
                  v-for="(item, index) in rating.recommend"
                  :key="index"
                >{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import star from "components/star/star.vue";
import split from "components/split/split.vue";
import ratingselect from "components/ratingselect/ratingselect.vue";
import { getRatings } from "api/index.js";
import moment from "moment";
import minrating from 'common/js/rating'

export default {
  mixins: [minrating],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ratings: []
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  methods: {
    // 通过接口获取数据并将其保存到数组中
    fetch() {
      if (!this.fetched) {
        this.fetched = true;
        getRatings({
          id: this.data.seller.id
        }).then(res => {
          this.ratings = res;
        });
      }
    },
    // 时间
    format(time) {
      return moment(time).format("YYYY-MM-DD hh:mm");
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable.styl';
@import 'common/stylus/mixin.styl';

.ratings
  position: relative;
  top: 0;
  bottom: 0;
  overflow: hidden;
  .overview
    display: flex;
    padding: 18px 0;
    .overview-left
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid $color-row-line;
      text-align: center;
      @media only screen and (max-width: 320px)
        flex: 0 0 120px;
        width: 120px;
      .score
        line-height: 28px;
        font-size: 24px;
        color: $color-yellow;
        margin-bottom: 6px;
      .title
        font-size: 12px;
        line-height: 12px;
        color: $color-black7;
        margin-bottom: 6px;
      .rank
        font-size: 10px;
        line-height: 20px;
        color: $color-gray;
    .overview-right
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px)
        padding-left: 5px;
      .score-wrapper
        margin-bottom: 8px;
        font-size: 0;
        .title
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: $color-black7;
        .star
          display: inline-block;
          vertical-align: top;
          margin: 0 12px;
        .score
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: $color-yellow;
      .delivery-wrapper
        font-size: 0;
        line-height: 18px;
        .title
          color: $color-black7;
          margin-right: 12px;
          font-size: 12px;
        .delivery
          color: $color-gray;
          font-size: 12px;
  .rating-wrapper
    padding: 0 18px;
    .rating-item
      display: flex;
      padding: 18px 0;
      border-1px($color-row-line)
      .avatar
        flex: 0 0 28px;
        width: 28px;
        height 28px;
        margin-right: 12px;
        border-radius: 50%;
        overflow hidden
      .content
        flex 1
        position relative
        width 1px
        .name
          line-height 12px
          margin-bottom 4px
          .username
            font-size 10px
            color $color-black7
          .rateTime
            position absolute
            right 0
            color $color-gray
            font-size 10px
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            vertical-align top
            margin-right 6px
          .delivery
            display inline-block
            vertical-align top
            font-size 12px
            color $color-gray
            line-height 10px
        .text
          margin-bottom: 8px
          line-height: 18px
          color: $color-dark-grey
          font-size: 12px
          white-space:pre-wrap; // 中文强制换行
          color $color-black7
        .recommend
          font-size 0
          .icon-thumb_up,.icon-thumb_down
            float left
            font-size 12px
            margin-right 8px
            line-height 16px
            margin-top 2px
          .icon-thumb_up
            color $color-blue
          .icon-thumb_down
            color rgb(183,187,191)
          .recomend-value
            float left
            border 1px solid $color-row-line
            margin-right 8px
            margin-bottom 4px
            padding 2px 6px
            font-size 10px
            line-height 16px
            color $color-gray
            word-break:break-all; // 中文强制换行
</style>
