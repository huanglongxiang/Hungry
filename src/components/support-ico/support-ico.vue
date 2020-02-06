<template>
  <!-- 通过动态绑定样式来改变图标的大小与种类 -->
  <span class="support-ico" :class="iconCls"></span>
</template>

<script>
export default {
  name: "support-ico",
  props: {
    size: { type: Number },
    type: { type: Number }
  },
  /* 计算属性，通过计算属性来动态更改 */
  computed: {
    iconCls() {
      // 将需要改变的样式用数组存储
      const classMap = [
        "decrease",
        "discount",
        "special",
        "invoice",
        "guarantee"
      ];
      // 根据传入大小，种类，来返回样式名
      return `icon-${this.size} ${classMap[this.type]}`;
    }
  }
};
</script>

<style lang="stylus" scoped>
/* 引入外部样式 */
@import 'common/stylus/mixin.styl';

.support-ico {
  display: inline-block;
  background-repeat: no-repeat;
}

.icon-1 {
  width: 12px;
  height: 12px;
  background-size: 12px 12px;

  &.decrease {
    // bg-image cube ui定义的默认方法，主要用来读取图片
    bg-image('decrease_1');
  }

  &.discount {
    bg-image('discount_1');
  }

  &.invoice {
    bg-image('invoice_1');
  }

  &.guarantee {
    bg-image('guarantee_1');
  }

  &.special {
    bg-image('special_1');
  }
}

.icon-2 {
  width: 16px;
  height: 16px;
  background-size: 16px 16px;

  &.decrease {
    bg-image('decrease_2');
  }

  &.discount {
    bg-image('discount_2');
  }

  &.invoice {
    bg-image('invoice_2');
  }

  &.guarantee {
    bg-image('guarantee_2');
  }

  &.special {
    bg-image('special_2');
  }
}

.icon-3 {
  width: 24px;
  height: 24px;
  background-size: 24px 24px;

  &.decrease {
    bg-image('decrease_3');
  }

  &.discount {
    bg-image('discount_3');
  }

  &.invoice {
    bg-image('invoice_3');
  }

  &.guarantee {
    bg-image('guarantee_3');
  }

  &.special {
    bg-image('special_3');
  }
}

.icon-4 {
  width: 32px;
  height: 32px;
  background-size: 32px 32px;

  &.decrease {
    bg-image('decrease_4');
  }

  &.discount {
    bg-image('discount_4');
  }

  &.invoice {
    bg-image('invoice_4');
  }

  &.guarantee {
    bg-image('guarantee_4');
  }

  &.special {
    bg-image('special_4');
  }
}
</style>
