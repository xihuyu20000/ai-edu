const lodash = require("lodash");
const mysql = require("mysql");
const config = {
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "easyfms",
  debug: ["ComQueryPacket", "RowDataPacket"],
};

const pool = mysql.createPool(config);

const connection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      console.log("MySQL pool connected: threadId " + connection.threadId);
      const query = (sql, binding) => {
        return new Promise((resolve, reject) => {
          connection.query(sql, binding, (err, result) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      };
      const release = () => {
        return new Promise((resolve, reject) => {
          if (err) reject(err);
          console.log("MySQL pool released: threadId " + connection.threadId);
          resolve(connection.release());
        });
      };
      resolve({ query, release });
    });
  });
};

/**
 * 执行查询语句
 * @param {String}} sql 查询语句，可以使用？作为占位符
 * @param {Array} params 参数
 */
async function query(sql, params) {
  const conn = await connection();
  const resultSet = await conn.query(sql, params);
  await conn.release();
  return resultSet;
}

/**
 * 执行一条或者批量语句，带事务
 * @param {String|Array} sql 语句，可以使用？作为占位符
 * @param {String|Array} params 参数
 */
async function exec(sql, params) {
  const conn = await connection();
  await conn.query("START TRANSACTION");
  let resultSet = null;
  if (typeof sql == "string") {
    resultSet = await conn.query(sql, params);
  }
  if (typeof sql == "object") {
    resultSet = [];
    for (let i in sql) {
      if (params) {
        resultSet[i] = await conn.query(sql[i], params[i]);
      } else {
        resultSet[i] = await conn.query(sql[i]);
      }
    }
  }
  await conn.query("COMMIT");
  await conn.release();
  return resultSet;
}

/**
 * 插入一条记录
 * @param {String} table 表名称
 * @param {Object} values 数据
 */
async function create(table, values) {
  let sql = `insert into ${table} set ?`;
  let results = await exec(sql, values);
  return results.insertId;
}
/**
 * 查询
 *
 * // 第1种，promise 写法
 * const tableName = 'my_table';
 * const fields = ['name', 'age'];
 * const where = {id: 1};
 * const limit = 1;
 *
 * // 第2种，async / await 写法
 * const tableName = 'my_table';
 * const fields = ['name', 'age'];
 * const where = {id: 1};
 * const limit = 1;
 *
 * // 复杂查询
 * const tableName = 'my_table';
 * const fields = ['name', 'age'];
 * 范围查询
 * const where = {id: {
 *     '>=': 1,
 *     '<': 10
 * }};
 * const limit = 1;
 *
 *
 * @param {string} table 表名
 * @param {Array} fields 字段名
 * @param {Object} where
 * @param {number} limit 限制取几条
 * @return {*}
 */
async function find(table, fields, where, limit) {
  if (!fields) fields = ["*"];
  if (typeof fields === "string") fields = [fields];

  let fieldsStr = fields.join(", ");
  let sql = `select ${fieldsStr} from ${table}`;
  // condition 和 condArgs 可能为空数组
  let condArgs;
  if (!lodash.isEmpty(where)) {
    condArgs = [];
    let condition = [];
    for (let cond in where) {
      if (!where.hasOwnProperty(cond)) {
        continue;
      }
      if (typeof where[cond] === "object") {
        for (let i in where[cond]) {
          condArgs.push(where[cond][i]);
          condition.push(`${cond} ${i} ?`);
        }
      } else {
        condArgs.push(where[cond]);
        condition.push(cond + " = ? ");
      }
    }
    sql += " where " + condition.join(" and ");
  }
  // limit 可能为空
  if (limit) {
    sql += ` limit ${limit}`;
  }
  return query(sql, condArgs);
}

/**
 * 查询一条记录
 *
 * const tableName = 'my_table';
 * const fields = ['name', 'age'];
 * const where = {id: 1};
 * @param {string} table 表名
 * @param {Array} fields 字段名
 * @param {Object} where
 * @return {*}
 */
async function findOne(table, fields, where) {
  const result = await find(table, fields, where, 1);
  return result[0];
}

module.exports = { query, exec, create, find, findOne };
