<template>
  <transition name="fade">
    <!-- Sticky footer布局 内容随机撑开 底部结构始终在最底部 -->
    <div class="detail" v-show="visible">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <!-- 星星主键引入 -->
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <!-- 线布局使用 -->
          <line-text :title="`优惠信息`"></line-text>
          <!-- 优惠信息 -->
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
              <support-ico class="icon" :size="2" :type="item.type"></support-ico>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <!-- 商品公告 -->
          <line-text :title="`商品公告`"></line-text>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="closeDetail"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import star from "components/star/star.vue";
import lineText from "components/lineText/lineText.vue";
import supportIco from "components/support-ico/support-ico.vue";
export default {
  name: "header-detail",
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      visible: false
    };
  },
  components: {
    star,
    lineText,
    supportIco
  },
  methods: {
    closeDetail() {
      this.visible = false;
    },
    show() {
      this.visible = true;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/base.styl';

.detail {
  color: #fff;
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(7, 17, 27, 0.8);
  top: 0;
  left: 0;

  .detail-wrapper {
    min-height: 100%;
    width: 100%;

    .detail-main {
      margin-top: 64px;
      padding-bottom: 64px;

      .name {
        text-align: center;
      }

      .star-wrapper {
        margin-top: 16px;
        padding: 2px 0;
        text-align: center;
      }

      .supports {
        width: 80%;
        margin: 0 auto;

        .support-item {
          padding: 0 12px;
          margin-bottom: 12px;

          &:last-child {
            margin-bottom: 0;
          }

          .text {
            font-size: 12px;
            line-height: 12px;
            display: inline-block;
            vertical-align: top;
            margin-top: 3px;
            margin-left: 6px;
          }
        }
      }

      .bulletin {
        width: 80%;
        margin: 0 auto;

        .content {
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
        }
      }
    }
  }

  .detail-close {
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.5s;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
  background: rgba(7, 17, 27, 0.8);
}
</style>
