<template>
  <div class="shopChar" @click="toggleList">
    <div class="login">
      <div class="loginRiade" :class="{'hightlight':totalCount}">
        <i class="icon icon-shopping_cart" :class="{'hightlight':totalCount}"></i>
      </div>
      <div class="shopCount" v-if="totalCount">{{totalCount}}</div>
    </div>
    <div class="content">
      <span class="AllShopPrice" :class="{'hightlight':totalPrice}">￥{{totalPrice}}</span>
      <p class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</p>
    </div>
    <div class="priceBox" :class="payClass" @click.stop="pay">{{totalResString}}</div>
    <!-- 小球盒子 -->
    <div class="globuleBox" ref="globuleBox">
      <div v-for="(item, index) in goodBox" :key="index">
        <transition @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div class="ref_globule_move" v-show="item.show">
            <div class="ref_globule ref-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      goodBox: [],
      listFold: this.fold
    };
  },
  created() {
    // 生成5个小球 ,并对小球进行初始化操作
    for (let i = 0; i < 5; i++) {
      this.goodBox.push({
        show: false
      });
    }
    this.dropBox = [];
  },
  computed: {
    // 计算总价
    totalPrice() {
      let total = 0;
      this.$store.state.foodArry.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    // 计算商品总个数
    totalCount() {
      let count = 0;
      this.$store.state.foodArry.forEach(food => {
        count += food.count;
      });
      return count;
    },
    // 计算结算按钮状态
    totalResString() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还差￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return " 去结算 ";
      }
    },
    // 计算样式显示
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "";
      } else {
        return "priceClear";
      }
    }
  },
  methods: {
    // 控制是否显示列表信息
    toggleList() {
      // 监听器不一致，所以这里，保险起见，直接进行再赋值
      this.listFold = this.fold
      // this._hideshopCharEctype()
      if (this.listFold) {
        if (!this.totalCount) {
          return;
        }
        this.listFold = false;
        this._showShopCartList();
        this._shopCharEctype();
      } else {
        this.listFold = true;
        this._hideShoCartList();
      }
    },
    // 创建列表
    _showShopCartList() {
      let _this = this;
      this.shopList =
        this.shopList ||
        this.$createShopList({
          $props: {
            foodArry: _this.$store.state.foodArry
          },
          // 处理所配发的事件,在隐藏触发之后需要修改当前listFold状态
          $events: {
            hide: () => {
              this.listFold = true
            },
            // 控制弹层动画结束之后在对副本进行删除
            leave: () => {
              this._hideshopCharEctype()
            },
            // 实现小球动画
            add: (el) => {
              this.shopCharEctype.drop(el)
            }
          }
        });
      this.shopList.show();
    },
    // 隐藏列表
    _hideShoCartList() {
      // 判定什么时候应该调用父组件，和什么时候直接调用,通过sticky来判断
      //  通过该组件在创建列表组件时，副本中会生成一个sticky,通过对比sticky,来实现切换
      let comp = this.sticky ? this.$parent.list : this.shopList;
      comp.hide() && comp.hide();
    },
    // 创建购物车副本
    _shopCharEctype() {
      this.shopCharEctype =
        this.$createShopCharEctype({
          $props: {
            data: {
              deliveryPrice: this.deliveryPrice,
              minPrice: this.minPrice
            },
            // 传入组件，方便在隐藏时调用
            list: this.shopList,
            fold: this.listFold
          }
        });
      this.shopCharEctype.show();
    },
    // 隐藏购物副本组件
    _hideshopCharEctype() {
      this.shopCharEctype.hide()
      this.shopCharEctype.remove()
      this.fold = true
    },
    // 小球动画实现
    addShopBall(element) {
      this.goodBox.some(item => {
        if (!item.show) {
          item.show = true;
          item.el = element;
          this.dropBox.push(item);
          return true;
        }
      });
    },
    // 去支付逻辑实现（购物车弹起与弹框弹起的控制）
    pay(e) {
      // 判定价格是否达标
      if (this.totalPrice < this.minPrice) {
        return
      };
      // 基本功能实现
      this.$createDialog({
        title: '支付',
        content: `您需要支付${this.totalPrice}元`
      }).show();
      // 阻止事件默认行为
      e.stopPropagation();
    },
    // 这里的动画主要是通过vue的动画钩子函数来进行实现的
    beforeDrop(el) {
      // 拿到最后一个小球的位置
      const ball = this.dropBox[this.dropBox.length - 1];
      // 获取小球的DOM元素
      const rect = ball.el.getBoundingClientRect();
      const x = rect.left - 30;
      const y = -(window.innerHeight - rect.top - 22);
      el.style.display = "";
      el.style.transform = el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      let inner = el.getElementsByClassName("ref-hook")[0];
      inner.style.transform = `translate3d(${x}px,0,0)`;
    },
    dropping(el, done) {
      // 重置样式
      this._reflow = document.body.offsetHeight;
      el.style.transform = el.style.webkitTransform = "translate3d(0,0,0)";
      let inner = el.getElementsByClassName("ref-hook")[0];
      inner.style.transform = "translate3d(0,0,0)";
      // 实现对组件的监听 动画结束之后，让元素执行之后的函数
      el.addEventListener("transitionend", done);
    },
    afterDrop(el) {
      const ball = this.dropBox.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
  watch: {
    // 侦听购物车是否已经为空，并进行关闭蒙版与弹层等逻辑
    totalCount (flag) {
      if (!this.listFold && !flag) {
        this._hideShoCartList()
      }
    }
  }
};
</script>

<style lang="stylus">
.shopChar {
  position: absolute;
  bottom: 0;
  height: 48px;
  width: 100%;
  background: #141d27;
  display: flex;
  z-index: 200;

  /* 小球盒子 */
  .globuleBox {
    position: fixed;
    left: 30px;
    bottom: 20px;
    width: 24px;
    height: 24px;
    z-index: 200;

    .ref_globule_move {
      position: fixed;
      transition: all 0.9s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      left: 30px;
      bottom: 20px;

      .ref_globule {
        transition: all 0.9s linear;
        border-radius: 50%;
        background: $color-blue;
        width: 16px;
        height: 16px;
      }
    }
  }

  .login {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #141d27;
    position: absolute;
    margin-left: 16px;
    margin-top: -12px;

    .loginRiade {
      width: 48px;
      height: 48px;
      position: absolute;
      margin-top: 5px;
      margin-left: 2px;
      background: #2b343c;
      border-radius: 50%;
      text-align: center;

      &.hightlight {
        background: #00a0dc;
      }

      .icon {
        color: #80858a;
        line-height: 48px;
        font-size: 26px;

        &.hightlight {
          color: #ffffff;
        }
      }
    }

    .shopCount {
      padding: 2px 6px;
      width: 12px;
      border-radius: 8px;
      background: $color-red;
      position: absolute;
      top: 3px;
      right: -9px;
      color: #fff;
      font-size: 12px;
      text-align: center;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    }
  }

  .content {
    flex: 1;
    display: flex;

    .AllShopPrice {
      margin-left: 60px;
      height: 24px;
      line-height: 24px;
      font-size: 16px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
      padding: 0 12px;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      position: relative;
      top: 50%;
      transform: translateY(-50%);

      &.hightlight {
        color: #ffffff;
      }
    }

    .deliveryPrice {
      font-size: 12px;
      margin-left: 12px;
      line-height: 48px;
      color: rgba(255, 255, 255, 0.4);
    }
  }

  .priceBox {
    width: 105px;
    background: #2b333b;
    text-align: center;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    line-height: 48px;
    font-weight: 700;

    &.priceClear {
      background: #00b43c;
      color: #ffffff;
    }
  }
}
</style>
