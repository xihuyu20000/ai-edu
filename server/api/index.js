module.exports = (app) => {
  const glob = require("glob");
  // 批量注册
  glob("api/**/*-api.js", function (er, files) {
    files.forEach((file) => {
      file = "./" + file.substr(4);
      console.info("register api file   ", file);
      require(file)(app);
    });
  });
};
