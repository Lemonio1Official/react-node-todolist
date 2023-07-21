import { Router } from "pixerver";
import db from "../db";

const router = Router();

router.get("/", async (_, res) => {
  const rows = await db.query("SELECT * FROM tasks");
  for (const r of rows) {
    r.done = !!r.done;
  }
  rows ? res.json({ data: rows }) : res.json({ message: "database error" });
});

router.post("/add", async (req, res) => {
  const { text } = req.body;
  const { insertId, rows } = await db.query("INSERT INTO tasks (text, done) VALUES (?, ?)", [text, false]);
  if (rows) res.json({ data: { id: insertId, text } });
  else res.json({ message: "Error while adding" });
});

router.put("/", async (req, res) => {
  const { id, text, done } = req.body;
  if (text) {
    const resp = await db.query(`UPDATE tasks SET text = ? WHERE id = ?`, [text, id]);
    if (!resp.code) res.json({ data: text });
    else res.json({ message: "Error while updating" });
  }
  if (done !== undefined) {
    const resp = await db.query(`UPDATE tasks SET done = ? WHERE id = ?`, [done, id]);
    if (!resp.code) res.json({ data: done });
    else res.json({ message: "Error while updating" });
  }
});

router.delete("/:id", async (req, res) => {
  const resp = await db.query(`DELETE FROM tasks WHERE id = ${req.params.id}`);
  if (!resp.code) res.json({ data: Number(req.params.id) });
  else res.json({ message: "Deletion error" });
});

export default router;
