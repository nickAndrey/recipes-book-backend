const { pool } = require('./pool');

class Model {
  constructor(table) {
    this.table = table;
    this.pool = pool;

    this.pool.on('error', (err, client) => {
      return `Error, ${err}, on idle client${client}`;
    });
  }

  async select(columns, clause) {
    let query = `select ${columns} from ${this.table}`;

    if (clause) {
      query += clause;
    }
    return this.pool.query(query);
  }

  async insert(columns, values, returnValue = false) {
    let query = `insert into ${this.table}(${columns}) values (${values})`;

    if (returnValue) {
      query += `returning id, ${columns}`;
    }
    return this.pool.query(query);
  }

  async update(columns, values, id, returnValue = false) {
    let query = `update ${this.table} set (${columns}) = (${values}) where id = ${id}`;

    if (returnValue) {
      query += `returning id, ${columns}`;
    }
    return this.pool.query(query);
  }

  async delete(id) {
    const query = `delete from ${this.table} where id = ${id}`;
    return this.pool.query(query);
  }
}

exports.Model = Model;
