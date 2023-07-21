import mysql from "mysql";
import ImproveDB from "./utils/db";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist_db",
});

export default ImproveDB(db);
