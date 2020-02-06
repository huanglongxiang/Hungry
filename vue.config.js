/* 设置默认路径 */
const path = require('path')
/* 引入需要读取的数据，并将数据进行分类 */
const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

/* 拼接路径 */
function resolve (dir) {
  // 当前路径+传入路径
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    before (app) {
      // 默认请求项，
      app.get('/api/seller', function (req, res) {
        // 先获取商家id
        const id = req.query.id
        // 读取请求数据
        res.json({
          errno: 0, // 状态码
          // 将获取的id拼接到数据中去
          data: Object.assign({}, seller, { id })
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  // 通过webpack来配置相对的默认路径，以方便之后调用
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('router', resolve('src/router'))
      .set('api', resolve('src/api'))
      .set('cube-ui', resolve('node_modules/cube-ui'))
  }
}
