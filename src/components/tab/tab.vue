<template>
  <div class="tab_bar">
    <cube-tab-bar
      :showSlider="true"
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
      :useTransition="false"
    ></cube-tab-bar>
    <!-- 切换页 -->
    <div class="slide-wrapper">
      <cube-slide
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        ref="slide"
        @change="onChange"
        @scroll="onscroll"
        :options="slideOptions"
      >
        <cube-slide-item v-for="(item, index) in tabs" :key="index">
          <component :is="item.component" :data="item.data" ref="component"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: "tab",
  props: {
    tabs: {
      type: Array,
      default() {
        return [];
      }
    },
    initialindex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialindex, // 控制默认选项卡
      slideOptions: {
        // 滚动监听配置 以达到滚动条实时响应
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0 // 设置竖向滚动，让横向滚动与竖向滚动不发生冲突
      }
    };
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label;
      },
      set(newVal) {
        /* 实现组件切换 */
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal;
        });
      }
    }
  },
  mounted() {
    this.onChange(this.initialindex);
  },
  methods: {
    onChange(curent) {
      this.index = curent;
      // 拿到对应组件的返回数据 curent当前值的索引
      const component = this.$refs.component[curent];
      component.fetch && component.fetch();
    },
    onscroll(page) {
      // 获取选项卡宽度
      let tabBarWidth = this.$refs.tabBar.$el.clientWidth;
      // 获取内容总宽度
      let slideWidth = this.$refs.slide.slide.scrollerWidth;
      let transform = (-page.x / slideWidth) * tabBarWidth;
      // 改变横线实时跟随滚动
      this.$refs.tabBar.setSliderTransform(transform);
    }
  }
};
</script>

<style lang='stylus' scoped>
@import 'common/stylus/mixin';

/* 指定修改样式，通过>>>来进行修改 */
.tab_bar {
  >>> .cube-tab {
    padding: 10px 0;
  }

  display: flex;
  flex-direction: column;
  height: 100%;

  .slide-wrapper {
    flex: 1;
    overflow: hidden;
  }
}
</style>
