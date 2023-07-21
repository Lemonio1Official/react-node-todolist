import { Pool } from "mysql";

type query = (sql: string, values?: any[]) => Promise<any>;

interface IPool extends Omit<Pool, "query"> {
  query: query;
}

const reAssign = (key: string, value: any, parent: any) => {
  parent["__" + key] = parent[key];
  parent[key] = value(parent);
};

const query = (db) => {
  return (sql, values = []) =>
    new Promise((res) => {
      const query = db.__query(sql, values, (err, rows) => {
        if (err) console.log(err);
        const result = query._results[0] || {};
        result.rows = rows;
        res(result);
      });
    });
};

const ImproveDB = (db: any) => {
  reAssign("query", query, db);
  return db as IPool;
};

export default ImproveDB;
