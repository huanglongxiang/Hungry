<template>
  <cube-scroll :options="sellerScrollOptions">
    <div class="seller">
      <div class="overview">
        <h1 class="title">{{data.seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="data.seller.score" class="star"></star>
          <span class="text">({{data.seller.ratingCount}})</span>
          <span class="text">月售{{data.seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{data.seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{data.seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{data.seller.deliveryTime}}</span>元
            </div>
          </li>
        </ul>
        <div class="collect" @click="addCollect">
          <div class="icon-favorite icon" :class="{'active':isCollectFlag}"></div>
          <span class="collectText">{{collectText}}</span>
        </div>
      </div>
      <split></split>
      <!-- 活动公告 -->
      <div class="bulltin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{data.seller.bulletin}}</p>
        </div>
        <!-- 优惠信息 -->
        <ul v-if="data.seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in data.seller.supports" :key="index">
            <support-ico class="icon" :size="3" :type="item.type"></support-ico>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <!-- 轮播图 -->
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <cube-scroll class="pic-wrapper"  :options="picScrollOptions">
          <ul class="pic-list">
            <li class="pic-item"
                v-for="(pic,index) in data.seller.pics"
                :key="index"
            >
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>
      <!-- 商家信息 -->
      <div class="message">
        <h1 class="title">商家信息</h1>
        <ul>
          <li
          v-for="(item, index) in data.seller.infos"
          :key="index"
          class="info-item">{{item}}</li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import star from "components/star/star";
import split from "components/split/split";
import supportIco from "components/support-ico/support-ico";
import { saveToLocal, loadFromLocal } from 'common/js/storage.js'

const KEY = 'collect'

export default {
  props: {
    data: {
      type: Object
    }
  },
  components: {
    star,
    split,
    supportIco
  },
  data() {
    return {
      sellerScrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      picScrollOptions: {
        scrollX: true,
        stopPropagation: true,
        directionLockThreshold: 0
      },
      isCollectFlag: false
    }
  },
  created() {
    this.isCollectFlag = loadFromLocal(this.data.seller.id, KEY, false)
  },
  computed: {
    collectText() {
      return this.isCollectFlag ? '已收藏' : '未收藏'
    }
  },
  methods: {
    addCollect() {
      this.isCollectFlag = !this.isCollectFlag
      saveToLocal(this.data.seller.id, KEY, this.isCollectFlag)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable.styl';
@import 'common/stylus/mixin.styl';

.seller
  position: relative;
  .overview
    padding: 18px;
    width: 100%;
    box-sizing: border-box;
    .title
      margin-bottom: 8px;
      line-height: 14px;
      color: $color-black7;
      font-size: 14px;
    .desc
      width: 100%;
      font-size: 0;
      padding-bottom: 18px;
      border-1px($color-row-line);
      .star
        display: inline-block;
        vertical-align: top;
        margin-right 8px
      .text
        display: inline-block;
        vertical-align: top;
        font-size: 10px;
        margin-right: 12px;
        color: $color-grayBlack;
        line-height 15px;
    .remark
      display: flex;
      padding-top: 18px;
      margin-bottom: 18px;
      .block
        flex: 1;
        text-align: center;
        border-right: 1px solid $color-row-line;
        &:last-child
          border: none;
        h2
          margin-bottom: 4px;
          line-height: 10px;
          font-size: 10px;
          color: $color-gray;
        .contentx
          line-height: 24px;
          font-size: 10px;
          color: $color-black7;
          margin-top: 4px;
          .stress
            font-size: 24px;
    .collect
      position absolute
      top 18px
      right 18px
      .icon
        text-align center
        font-size 24px
        line-height 24px
        margin-bottom 4px
        &.active
          color $color-red
      .collectText
        font-size 10px
        color $color-grayBlack
  .bulltin
    padding: 18px 18px 0 18px;
    .title
      margin-bottom: 8px;
      line-height: 14px;
      color: $color-black7;
      font-size: 14px;
    .content-wrapper
      padding: 0 12px 16px 12px;
      .content
        color: $color-red;
        white-space: pre-wrap;
        line-height: 24px;
        font-size: 12px;
    .supports
      .support-item
        padding: 12px 16px;
        border-top: 1px solid $color-row-line;
        text-align: left;
        .text
          font-size: 12px;
          line-height: 12px;
          display: inline-block;
          vertical-align: top;
          margin-top: 1px;
          margin-left: 6px;
        .icon
          background-size: 16px 16px;
          width: 16px;
          height: 16px;
  .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
      .pic-wrapper
        display: flex
        align-items: center
        .pic-list
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
  .message
    padding:18px
    color: $color-black7;
    .title
      margin-bottom: 12px
      line-height: 14px
      font-size: 14px;
    .info-item
      padding 16px 12px
      border-top 1px solid $color-row-line
      font-size 12px
      line-height 16px
      white-space: pre-wrap;
</style>
