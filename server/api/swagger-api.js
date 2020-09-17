var path = require("path");
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var swaggerJSDoc = require("swagger-jsdoc");

// 配置 swagger-jsdoc
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "智慧教育",
      description: "api",
      license: {
        name: "吴超",
        url: "http://www.crxy.cn",
      },
    },
    components: {
      schema: {
        Cat: {
          type: "object",
          properties: {
            genus: {
              type: "string",
            },
          },
        },
      },
    },
  },
  // 去哪个路由下收集 swagger 注释
  apis: [path.join(__dirname, "./**/*.js")],
};
var swaggerJson = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
};
const swaggerSpec = swaggerJSDoc(options);

var swaggerInstall = function (app) {
  if (!app) {
    app = express();
  }
  // 开放相关接口，
  app.get("/swagger.json", swaggerJson);
  // 使用 swaggerSpec 生成 swagger 文档页面，并开放在指定路由
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
module.exports = swaggerInstall;
