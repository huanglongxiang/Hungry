<template>
  <!-- 弹框蒙版动画 -->
  <transition name="fade">
    <!-- 弹出层组件设置 -->
    <cube-popup
      :mask-closable="true"
      v-show="visiblet"
      @mask-click="maskClick"
      position="bottom"
      type="shop-cart-list"
    >
      <!-- 动画设置 -->
      <transition name="shopList"
      @after-leave="onleave">
        <div class="shopcart-list" v-show="visiblet">
          <div class="list-header">
            <span class="title">购物车</span>
            <span class="clearsShopCar" @click="empty">清空</span>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li v-for="(item, index) in this.$store.state.foodArry" class="listfoot" :key="index" v-show="item.price * item.count !== 0">
                <h6 class="title">{{item.name}}</h6>
                <span class="price">￥{{item.price * item.count}}</span>
                <cartcontrol :food="item" @addCircle="addCircle"></cartcontrol>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import cartcontrol from "components/cartcontrol/cartcontrol.vue";
import minpoplar from 'common/js/minpoplar.js';
// 隐藏事件
const EVENT_SHOW = 'show'
// 动画执行顺序事件
const EVENT_LEAVE = 'leave'
// 小球动画调用事件
const EVENT_ADD = 'add'

export default {
  name: "shop-list",
  mixins: [minpoplar],
  props: {
    foodArry: {
      type: Array
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
      })
    })
  },
  methods: {
    // 点击蒙层时触发
    maskClick() {
      this.hide();
    },
    // 优化弹层动画,离开动画
    onleave() {
      this.$emit(EVENT_LEAVE)
    },
    // 小球逻辑
    addCircle(element) {
      this.$emit(EVENT_ADD, element)
    },
    // 清空购物车逻辑
    empty() {
      this.$createDialog({
        type: 'confirm',
        content: '确认清空购物车？',
        $events: {
          confirm: () => {
            this.foodArry.forEach(item => {
              item.count = 0
            })
            this.hide();
            // 清空全局数组
            this.$store.commit("delAllFood");
          }
        }
      }).show()
    }
  },
  components: {
    cartcontrol
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable.styl';
@import 'common/stylus/mixin.styl';

.cube-shop-cart-list {
  bottom: 45px;

  /* 蒙版动画 */
  &.fade-enter, &.fade-leave-active {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .shopcart-list {
    width: 100%;
    transition: all 0.5s ease ease-in-out;

    /* 弹层动画 */
    &.shopList-enter, &.shopList-leave-active {
      transform: translate3d(0, 100%, 0);
    }

    &.shopList-enter-active, &.shopList-leave-active {
      transition: all 0.5s ease-in-out;
    }

    .list-header {
      height: 40px;
      line-height: 40px;
      background: $color-background-ssss;
      padding: 0 18px;
      border-bottom: 1px solid $color-row-line;

      .title {
        font-size: 14px;
        color: $color-black7;
        float: left;
      }

      .clearsShopCar {
        font-size: 12px;
        color: $color-blue;
        float: right;
      }
    }

    .list-content {
      width: 100%;
      padding: 0 18px;
      background: #fff;
      max-height: 217px;
      box-sizing: border-box;
      overflow: hidden;

      .listfoot {
        padding: 12px 0;
        border-1px($color-row-line);
        display: flex;
        position: relative;

        .title {
          font-size: 14px;
          color: $color-black7;
          line-height: 24px;
        }

        .price {
          font-size: 14px;
          line-height: 24px;
          color: $color-red;
          font-weight: 700;
          position: absolute;
          right: 80px;
        }
      }
    }
  }
}
</style>
