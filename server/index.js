require("./db");

const express = require("express");
const app = express();
app.use(require("cors")());
//req.body读取json数据
app.use(express.json());

require("./api/swagger-api")(app);
require("./api/sys/default-api")(app);
require("./api/sys/res-api")(app);
require("./api/sys/staff-api")(app);
require("./api/sys/student-api")(app);
require("./api/sys/org-api")(app);
require("./api/sys/role-api")(app);

const PORT = 33333;
app.listen(PORT, () => console.log(`the server is running on ${PORT} .....`));
