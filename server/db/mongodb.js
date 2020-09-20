const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/test-server-00", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("链接mongoose正常"))
  .catch((err) => console.error("链接mongoose出错", err));
