module.exports = {
  proxy: {
    '/ammeter': { //将www.exaple.com印射为/apis
      target: 'http://nbiot.legendfly.site:8088/ammeter', // 接口域名
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true, //是否跨域
      pathRewrite: {
        '^/ammeter': '' //需要rewrite的,
      }
    }
  }
}
