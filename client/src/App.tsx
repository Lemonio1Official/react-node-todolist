import { useEffect, useState } from "react";
import axios from "./utils/axios";
import { scrollToDown } from "./utils/scrollAnimation";
import AddTodo from "./components/AddTodo/AddTodo";
import TaskList from "./components/TaskList/TaskList";
import s from "./app.module.scss";

export type task = { id: number; text: string; done: boolean };

function App() {
  const [tasks, setTasks] = useState<task[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const app = document.getElementById("root");
      const items = [document.querySelector("h1")];
      if (!app) return;
      scrollToDown(app, items as HTMLElement[]);
    });
  }, [tasks]);
  useEffect(() => {
    axios.get("/todo").then(({ data }) => {
      if (!data.data) return console.log(data.message);
      setTasks(data.data);
    });
  }, []);

  return (
    <div className={s.app}>
      <h1>TODOLIST</h1>
      <div className={s.container}>
        <AddTodo tasks={tasks} setTasks={setTasks} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default App;
