import server from "pixerver";
import db from "./db";
import todoRoute from "./routes/todoRoute";

const PORT = 3000;
const app = server();

app.use(app.cors)(app.json);

app.use("/api/todo", todoRoute);

db.getConnection((err) => {
  if (err) return console.log("db not connected");
  app.listen(PORT, () => console.log("Server started on port", PORT));
});
