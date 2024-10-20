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
            <Check onClick={() => update(todo.id, { title: title })} />
            <Cancel onClick={() => setEditing(false)} />
          </div>
        </div>
      ) : (
        <div className={style.container} key={todo.id}>
          <input
            className={style.checkbox}
            id={`checkbox${todo.id}`}
            type="checkbox"
            checked={todo.isDone}
            onChange={() => update(todo.id, { isDone: !todo.isDone })}
          />
          <label htmlFor={`checkbox${todo.id}`} />
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
