<template>
  <div class="headerd">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" />
      </div>
    </div>
    <div class="bulletion-wrapper">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
      <div class="support" v-if="seller.supports">
        <support-ico class="icon" :size="size" :type="type"></support-ico>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
      <div class="support-count" v-if="seller.supports" @click="isShowHeaderDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="foot-wrapper" @click="isShowHeaderDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import supportIco from "components/support-ico/support-ico";

export default {
  data() {
    return {
      size: 0,
      type: 0
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.size = 1;
    this.type = 0;
  },
  components: {
    supportIco
  },
  methods: {
    isShowHeaderDetail() {
      this.headerDetailComp =
        this.headerDetailComp ||
        this.$createHeaderDetail({
          $props: {
            seller: "seller"
          }
        });
      this.headerDetailComp.show();
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin.styl';
@import 'common/stylus/icon.styl';

.headerd {
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  padding-top: 24px;
  position: relative;

  .content-wrapper {
    padding: 0 12px 18px 24px;
    font-size: 0;
    display: inline-block;

    img {
      border-radius: 2px;
    }
  }

  .bulletion-wrapper {
    font-size: 14px;
    position: absolute;
    width: 73%;
    display: inline-block;
    vertical-align: top;

    .title {
      margin: 0 0 8px 0;

      .brand {
        display: inline-block;
        width: 30px;
        height: 18px;
        margin-right: 6px;
        bg-image('brand');
        background-size: 30px 18px;
        background-repeat: no-repeat;
        vertical-align: top;
      }

      .name {
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
        vertical-align: top;
      }
    }

    .description {
      margin-bottom: 10px;
      line-height: 12px;
      font-size: 12px;
    }

    .support {
      .icon {
        vertical-align: top;
      }

      .text {
        display: inline-block;
        vertical-align: top;
        margin-left: 6px;
        height: 12px;
        line-height: 12px;
        font-size: 10px;
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 0px;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;

      .count {
        font-size: 10px;
        vertical-align: top;
        display: inline-block;
        height: 100%;
      }

      .icon-keyboard_arrow_right {
        font-size: 10px;
        display: inline-block;
        vertical-align: top;
        margin-left: 2px;
        line-height: 24px;
      }
    }
  }

  .foot-wrapper {
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    background: rgba(7, 17, 27, 0.2);

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      line-height: 12px;
      bg-image('bulletin');
      background-size: 22px 12px;
      background-repeat: no-repeat;
      margin-right: 5px;
      vertical-align: top;
      margin-top: 10px;
    }

    .bulletin-text {
      font-size: 10px;
    }

    .icon-keyboard_arrow_right {
      font-size: 10px;
      position: absolute;
      right: 12px;
      top: 11px;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }
}
</style>
