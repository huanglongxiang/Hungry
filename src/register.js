// 这里的定义主键，都是需要在全局页面中调用的组件
import {
  createAPI
} from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from 'components/header-detail/header-detail.vue'
import ShopList from 'components/shop-list/shop-list.vue'
import ShopCharEctype from 'components/shopCharEctype/shopCharEctype'
import Food from 'components/food/food.vue'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopList)
createAPI(Vue, ShopCharEctype)
createAPI(Vue, Food)
