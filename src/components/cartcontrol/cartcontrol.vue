<template>
  <div class="shopSelect">
    <transition name="sub">
      <span class="subShop" v-show="food.count" @click.stop.prevent="subShop">
        <i class="inner icon-remove_circle_outline"></i>
      </span>
    </transition>
    <span class="shopNum" v-show="food.count">{{food.count}}</span>
    <i class="icon icon-add_circle" @click.stop.prevent="addShop" ref="icon"></i>
  </div>
</template>

<script>
export default {
  name: "shopSelect",
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addShop() {
      // 与购物车联动逻辑
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$store.commit("addFoodArry", this.food);
      // 小球动画实现逻辑(传出自生DOM，而实际执行动画的是购物车的动画)
      this.$emit("addCircle", this.$refs.icon);
    },
    subShop() {
      this.food.count--;
      if (this.food.count < 0) {
        this.food.count = 0;
      }
      this.$store.commit("delFoodArry", this.food);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/variable';

.shopSelect {
  display: flex;
  position: absolute;
  right: 0;
  font-size: 0;
  height: 24px;

  .icon {
    font-size: 24px;
    color: $color-blue;
    line-height: 24px;
  }

  .shopNum {
    width: 24px;
    color: $color-gray;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
  }

  .subShop {
    opacity: 1;
    transform: rotate(0);
    height: 100%;

    .inner {
      font-size: 24px;
      color: $color-blue;
      line-height: 24px;
      transition: all 0.5s linear;
    }

    &.sub-enter-active, &.sub-leave-active {
      transition: all 0.5s linear;
      // sub-leave-active这里再次调用是为了让离开时动画依然能正常退出，如果是sub-leave就不能正常退出
    }

    &.sub-enter, &.sub-leave-active {
      opacity: 0;
      transform: translate3d(28px, 0, 0) rotate(-180deg);
    }
  }
}
</style>
