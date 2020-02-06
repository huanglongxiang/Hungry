<template>
  <div v-if="visiblet">
    <shop-char
      class="ectype"
      :deliveryPrice="data.deliveryPrice"
      :minPrice="data.minPrice"
      ref="shopCar"
      :fold="fold"
      :sticky=true
    ></shop-char>
  </div>
</template>

<script>
import shopChar from "components/shopChar/shopChar.vue";
import minpoplar from 'common/js/minpoplar'

export default {
  name: "shop-char-ectype",
  // 混入创建时需要插入的代码，用来抽象公用方法
  mixins: [minpoplar],
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    list: {
      type: Object,
      default() {
        return {}
      }
    },
    fold: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 小球在列表中的实现
    drop(el) {
      this.$refs.shopCar.addShopBall(el)
    }
  },
  components: {
    shopChar
  }
};
</script>

<style lang="stylus" scoped>
.ectype {
  position: absolute;
  bottom: -1px;
  left: 0;
}
</style>
