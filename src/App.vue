<template>
  <div id="app">
    <v-headerd :seller="seller"></v-headerd>
    <div class="tab_warrper">
      <tab :tabs="tabs" :initialindex=0></tab>
    </div>
  </div>
</template>

<script>
import vHeaderd from 'components/header/header'
import Goods from 'components/goods/goods.vue'
import Ratings from 'components/ratings/ratings.vue'
import Seller from 'components/seller/seller.vue'
import tab from 'components/tab/tab'
import { getSeller } from 'api/index.js'
// 处理缓存
import qs from 'query-string'

export default {
  name: 'app',
  data () {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  computed: {
    tabs () {
      return [
        {
          label: '商品',
          component: Goods,
          data: { seller: this.seller }
        },
        {
          label: '评论',
          component: Ratings,
          data: { seller: this.seller }
        },
        {
          label: '商家',
          component: Seller,
          data: { seller: this.seller }
        }
      ]
    }
  },
  created () {
    getSeller({
      // 将商家id作为参数进行传递
      id: this.seller.id
    }).then(seller => {
      this.seller = seller
    })
  },
  components: {
    vHeaderd,
    tab
  }
}
</script>

<style  lang="stylus">
@import 'common/stylus/mixin.styl'
  .tab_warrper
    width 100%
    position absolute
    height 80%
    overflow hidden
</style>
