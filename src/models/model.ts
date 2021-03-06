import pool from './pool';
import { Pool } from 'pg';
import { recipeTableSchema } from './queries';

export class Model {
  table: string;
  pool: Pool;

  constructor(table: string) {
    this.table = table;
    this.pool = pool;

    this.pool.on('error', (err, client) => {
      return `Error, ${err}, on idle client${client}`;
    });
  }

  async select(columns: string, clause: string = '') {
    let query = `select ${columns} from ${this.table}`;

    if (clause) {
      query += clause;
    }
    return this.pool.query(query);
  }

  async insert(columns: string, values: string, returnValue: boolean = false) {
    let query = `insert into ${this.table} (${columns}) values (${values})`;

    if (returnValue) {
      query += `returning id, ${columns}`;
    }
    return this.pool.query(query);
  }

  async update(
    columns: string,
    values: string,
    id: string | undefined,
    returnValue: boolean = false
  ) {
    let query = `update ${this.table} set (${columns}) = (${values}) where id = ${id}`;

    if (returnValue) {
      query += `returning id, ${columns}`;
    }
    return this.pool.query(query);
  }

  async delete(id: string) {
    const query = `delete from ${this.table} where id = ${id}`;
    return this.pool.query(query);
  }

  async deleteMany(ids: string[]) {
    let query;

    if (ids && Array.isArray(ids)) {
      query = `delete from ${this.table} where id = any(${ids.map((id) =>
        parseInt(id)
      )}) returning *`;
    } else {
      query = `delete from ${this.table} where id = ${ids} returning *`;
    }
    return this.pool.query(query);
  }

  async dropTable(reason: string = '') {
    const query = `drop table if exists ${this.table}`;
    if (reason === 'this is unsafe') {
      return this.pool.query(query);
    }
    return `failed ${this.table} was not removed`;
  }

  async createTable() {
    const query = `create table if not exists ${this.table} ${recipeTableSchema}`;
    return this.pool.query(query);
  }
}
