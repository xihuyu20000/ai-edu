const h = require("../../api-helper");
const metaJson = {
  auth: require("./auth"),
  designform: require("./designform"),
  dict: require("./dict"),
  org: require("./org"),
  res: require("./res"),
  role: require("./role"),
  rule: require("./rule"),
  user: require("./user"),
};

async function getMetaTable(id) {
  if (!metaJson.hasOwnProperty(id)) return null;

  let metaTable = metaJson[id];
  if (!metaTable.hasOwnProperty("formFields")) return metaTable;

  // 对配置数据进行后期处理
  for (let formField of metaTable["formFields"]) {
    if (formField.hasOwnProperty("options")) {
      if (formField.options.style == "sql") {
        formField.options.values = await h.query(formField.options.sql);

        if (formField.style == "selecttree") {
          formField.options.values = h.tree(formField.options.values, -1);
        }
      }
      if (formField.options.style == "value") {
        if (typeof formField.options.values[0] != "object") {
          formField.options.values = formField.options.values.map((item) => {
            let obj = {};
            obj.id = item;
            obj.label = item;
            return obj;
          });
        }
      }
    }
  }
  return metaTable;
}

module.exports = { getMetaTable };
