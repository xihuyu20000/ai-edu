const h = require("../../api-helper");
const metaJson = require("./meta-json");

async function getMetaTable(id) {
  metaTable = metaJson[id];
  if (!metaTable.hasOwnProperty("formFields")) return metaTable;

  for (let formField of metaTable["formFields"]) {
    if (
      formField.hasOwnProperty("options") &&
      formField.options.style == "sql"
    ) {
      formField.options.values = await h.query(formField.options.sql);

      if (formField.style == "selecttree") {
        formField.options.values = h.tree(formField.options.values);
      }
    }
  }
  return metaTable;
}

module.exports = { getMetaTable };
