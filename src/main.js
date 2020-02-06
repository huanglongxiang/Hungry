import Vue from "vue";
import "./cube-ui";
import Vuex from "vuex"
import App from "./App.vue"
/* 引入样式 */
import "common/stylus/index.styl"
/* 引入路由 */
import router from "router/router"
/* 引入弹层 */
import "./register"

Vue.config.productionTip = false;
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    foodArry: []
  },
  mutations: {
    // 监听食物增减
    addFoodArry(state, resFoodObj) {
      let flag = false;
      if (state.foodArry) {
        state.foodArry.some(foot => {
          if (foot.name === resFoodObj.name) {
            flag = true;
            return true;
          }
        });
      }
      if (!flag) {
        state.foodArry.push(resFoodObj);
      }
    },
    delFoodArry(state, resFoodObj) {
      state.foodArry.some((foot, inde) => {
        if (foot.name === resFoodObj.name) {
          if (foot.count === 0) {
            state.foodArry.splice(inde, 1);
          }
          return true;
        }
      });
    },
    // 清空所有食物
    delAllFood(state) {
      state.foodArry = []
    }
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app")
