<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav :side="true" :data="goods" :options="scrollOptions" v-if="goods.length">
        <!-- 自定义导航样式  cube ui自定义（插槽应用）-->
        <template slot="bar" slot-scope="props">
          <!-- :txts 这里用来设定自定义样式属性（插槽） -->
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico v-if="props.txt.type>=1" :size="3" :type="props.txt.type" class="icon"></support-ico>
                <span class="foodStyleName">{{props.txt.name}}</span>
                <span v-if="props.txt.count>=1" class="shopCount">{{props.txt.count}}</span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <!-- 通过组件初始化导航列表 -->
        <cube-scroll-nav-panel
          v-for="item in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name"
        >
          <ul>
            <li
              v-for="food in item.foods"
              :key="food.name"
              class="foot-item"
              @click="selectFood(food)"
            >
              <div class="icon">
                <img :src="food.icon" width="57" height="57" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <p class="desc">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评{{food.rating}}%</span>
                </p>
                <p class="desc_price">
                  <span class="newPrice">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                  <v-cartcontrol :food="food" @addCircle="addCircle"></v-cartcontrol>
                </p>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <!-- 购物车组件 -->
    <v-shopCar
      :deliveryPrice="data.seller.deliveryPrice"
      :minPrice="data.seller.minPrice"
      ref="shopCar"
    ></v-shopCar>
  </div>
</template>

<script>
import { getGoods } from "api/index.js";
import vCartcontrol from "components/cartcontrol/cartcontrol.vue";
import supportIco from "components/support-ico/support-ico.vue";
import vShopCar from "components/shopChar/shopChar.vue";

export default {
  name: "goods",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      goods: [],
      food: {},
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    };
  },
  methods: {
    // 通过接口获取数据并将其保存到数组中
    fetch() {
      if (!this.fetched) {
        this.fetched = true;
        getGoods({
          id: this.data.seller.id
        }).then(res => {
          this.goods = res;
        });
      }
    },
    // 当触发添加商品时，小球动画也同时触发，并且在这里进行接收与实现
    addCircle(element) {
      this.$refs.shopCar.addShopBall(element);
    },
    // 进行商品详情页面
    selectFood(food) {
      this.food = food;
      this._showFoodDetail();
      this._showShopCharEctype();
    },
    // 创建商品详情页面
    _showFoodDetail() {
      this.footDetailComp =
        this.footDetailComp ||
        this.$createFood({
          $props: {
            food: "food"
          },
          $events: {
            leave: () => {
              // 优化闪屏
              this._hideShopCharEctype()
            },
            // 驱动小球动画
            add: (el) => {
              this.showShopCharEctype.drop(el)
            }
          }
        });
      this.footDetailComp.show();
    },
    // 购物车显示副本
    _showShopCharEctype() {
      let _this = this
      this.showShopCharEctype = this.$createShopCharEctype({
        $props: {
          data: {
            deliveryPrice: _this.data.seller.deliveryPrice,
            minPrice: _this.data.seller.minPrice
          },
          fold: true
        }
      })
      this.showShopCharEctype.show()
    },
    // 隐藏购物车副本
    _hideShopCharEctype() {
      this.showShopCharEctype.hide()
      this.showShopCharEctype.remove()
    }
  },
  // 计算
  computed: {
    // 拼接自定义导航样式
    barTxts() {
      let ret = [];
      this.goods.forEach(good => {
        // 解构应用
        const { type, name, foods } = good;
        let count = 0;
        foods.forEach(food => {
          count += food.count || 0;
        });
        ret.push({
          type,
          name,
          count
        });
      });
      return ret;
    }
  },
  // 模块
  components: {
    vCartcontrol,
    supportIco,
    vShopCar
  }
};
</script>

<style lang='stylus' scoped>
@import 'common/stylus/mixin';
@import 'common/stylus/variable';

.goods {
  position: relative;
  text-align: left;
  height: 100%;

  .scroll-nav-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 48px;
  }

  >>> .cube-scroll-nav-bar {
    width: 80px;
    white-space: normal;
    overflow: hidden;

    .text {
      width: 100%;
      height: 100%;
      line-height: 50%;
      box-sizing: border-box;
      padding-top: 20px;
      position: relative;

      .icon {
        width: 12px;
        height: 12px;
        background-size: 100%;
        margin-right: 2px;
        margin-top: 1px;
        display: inline-block;
        vertical-align: top;
      }

      .foodStyleName {
        margin-top: -40px;
        line-height: 15px;
      }

      .shopCount {
        padding: 4px 3px;
        width: 12px;
        border-radius: 8px;
        background: #f01414;
        position: absolute;
        top: 4px;
        right: -4px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
      }
    }
  }

  >>> .cube-scroll-nav-bar-item {
    padding: 0 10px;
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 14px;
    font-size: 12px;
    background: $color-background-ssss;
    font-weight: 200;
  }

  >>> .cube-scroll-nav-bar-item_active {
    background: $color-white;
    color: $color-black7;

    span {
      font-weight: 500;
    }
  }

  >>> .cube-scroll-nav-panel-title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid $color-col-line;
    font-size: 14px;
    background: $color-background-ssss;
    color: $color-grey;
  }

  .foot-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    position: relative;
    border-bottom: 1px solid $color-row-line;

    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .icon {
      margin-right: 10px;
    }

    .content {
      flex: 1;
      width: 0;

      .name {
        line-height: 12px;
        font-size: 14px;
      }

      .desc {
        font-size: 10px;
        color: $color-gray;
        margin-top: 8px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span {
          margin-right: 12px;
        }
      }

      .desc_price {
        margin-top: 8px;
        line-height: 24px;
        display: flex;
        position: relative;

        span {
          margin-right: 8px;

          &.newPrice {
            color: $color-red;
            font-weight: bold;
            font-size: 14px;
          }

          &.oldPrice {
            color: $color-gray;
            font-size: 10px;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>
