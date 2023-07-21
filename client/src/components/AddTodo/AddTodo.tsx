import { useState } from "react";
import axios from "../../utils/axios";
import { TodoItemProps } from "../TaskList/TaskList";
import s from "./addtodo.module.scss";

function AddTodo({ tasks, setTasks }: TodoItemProps) {
  const [value, setValue] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!value) return;
    axios
      .post("/todo/add", {
        text: value,
      })
      .then(({ data }) => {
        if (!data.data) return console.log(data.message);
        setTasks([...tasks, { ...data.data, done: false }]);
      });
    setValue("");
  };

  return (
    <form className={s.addtodo} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Enter a new task"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <button />
    </form>
  );
}

export default AddTodo;
