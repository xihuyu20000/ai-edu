// require("git c./db/mongodb");
const mysql = require("./db/mysql");

const express = require("express");
const app = express();
app.use(require("cors")());
app.use(express.json());

// require("./api/swagger-api")(app);
require("./api/dev/mysql/meta-api")(app);
require("./api/sys/mysql/default-api")(app);
require("./api/sys/mysql/auth-api")(app);
require("./api/sys/mysql/org-api")(app);
require("./api/sys/mysql/role-api")(app);
require("./api/sys/mysql/res-api")(app);
require("./api/sys/mysql/user-api")(app);

const PORT = 33333;
app.listen(PORT, () => console.log(`the server is running on ${PORT} .....`));
