import { useState, useRef, useEffect } from "react";
import { scrollToDown } from "../../utils/scrollAnimation";
import { task } from "../../App";
import s from "./tasklist.module.scss";
import axios from "../../utils/axios";

export interface TodoItemProps {
  tasks: task[];
  setTasks: (tasks: task[]) => void;
}

function TaskList({ tasks, setTasks }: TodoItemProps) {
  const [edit, setEdit] = useState<number | null>(null);
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const editHandler = (id: number, text: string) => {
    if (edit !== null) {
      axios.put("/todo", { id, text: value }).then(({ data }) => {
        if (data.data) setTasks(tasks.map((i) => (i.id === edit ? ((i.text = data.data), i) : i)));
      });
      setEdit(edit === id ? null : id), setValue(text);
    } else {
      setEdit(id), setValue(text);
    }
    setTimeout(() => input.current && input.current.focus());
  };
  const doneHandler = (id: number) => {
    if (edit === id) return editHandler(id, "");
    axios.put("/todo", { id, done: !tasks.find((i) => i.id === id)?.done }).then(({ data }) => {
      if (data.data !== undefined) setTasks(tasks.map((i) => (i.id === id ? ((i.done = data.data), i) : i)));
    });
  };
  const deleteHandler = (id: number) => {
    axios.delete(`/todo/${id}`).then(({ data }) => {
      if (!data.data) return console.log(data.message);
      setTasks(tasks.filter((i) => i.id !== data.data));
    });
  };

  useEffect(() => {
    const items = [...document.querySelectorAll(`.${s.task}`)] as HTMLElement[];
    if (!list.current || !items.length) return;
    scrollToDown(list.current, items);
  }, [list.current]);

  return (
    <ul className={s.tasklist} ref={list}>
      {tasks.map((i) => (
        <li key={i.id} className={s.task} c-done={i.done.toString()} c-edit={(i.id === edit).toString()}>
          {edit === i.id ? (
            <input type="text" ref={input} value={value} onChange={({ target }) => setValue(target.value)} />
          ) : (
            <aside>{i.text}</aside>
          )}
          <div>
            {edit !== i.id && !i.done && <span onClick={() => editHandler(i.id, i.text)} />}
            <s onClick={() => doneHandler(i.id)} />
            <em onClick={() => deleteHandler(i.id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
