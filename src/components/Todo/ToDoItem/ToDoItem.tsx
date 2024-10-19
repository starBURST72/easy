import { useState } from "react";
import { Todo, TodoRequest } from "../../../types/ToDoTypes.ts";
import style from "./ToDoItem.module.css";
import { Cancel, Check, Edit, Trash } from "../../../assets/svgIcons.tsx";
interface Props {
  todo: Todo;
  remove: (id: number) => Promise<void>;
  update: (id: number, updatedToDo: TodoRequest) => Promise<void>;
}

function ToDoItem({ todo, remove, update }: Props) {
  const [isEditing, setEditing] = useState(false);
  const [title, setNewTitle] = useState(todo.title);
  const saveTodo = (id: number, updatedTodo: TodoRequest) => {
    update(id, updatedTodo);
  };
  return (
    <>
      {isEditing ? (
        <div className={style.container} key={todo.id}>
          <input
            className={style.input}
            type="text"
            value={title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className={style.buttonsContainer}>
            <Check onClick={() => saveTodo(todo.id, { title: title })} />
            <Cancel onClick={() => setEditing(false)} />
          </div>
        </div>
      ) : (
        <div className={style.container} key={todo.id}>
          <input
            className={style.checkbox}
            id="checkbox"
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => saveTodo(todo.id, { isDone: e.target.checked })}
          />
          <label htmlFor="checkbox" />
          <h2 className={style.h2}>{todo.title}</h2>
          <div className={style.buttonsContainer}>
            <Edit onClick={() => setEditing(true)} />
            <Trash onClick={() => remove(todo.id)} />
          </div>
        </div>
      )}
    </>
  );
}

export default ToDoItem;
