module.exports = {
  devServer: {
    port: 22222,
    open: true,
    proxy: {
      //配置跨域
      "/api": {
        target: "http://localhost:8084/", //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, //允许跨域
        pathRewrite: {
          /* 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/core/getData/userInfo 时
            实际上访问的地址是：http://121.121.67.254:8185/core/getData/userInfo,因为重写了 /api
           */
          "^/api": "^/api",
        },
      },
    },
  },
  publicPath: "", // 部署应用时的基本URL
  outputDir: "../web", // build时构建文件的目录
  assetsDir: "", // build时放置生成的镜头资源（相对于outputDir）
  indexPath: "index.html", // 指定生成的index.html的输出路径（相对于outputDir）
};
