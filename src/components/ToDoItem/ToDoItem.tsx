import { useState } from "react";
import { Todo, TodoRequest } from "../../types/ToDoTypes.ts";
import style from "./ToDoItem.module.css";
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
            type="text"
            value={title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className={style.buttonsContainer}>
            <button onClick={() => saveTodo(todo.id, { title: title })}>
              Сохранить
            </button>
            <button onClick={() => remove(todo.id)}>удалить</button>
          </div>
        </div>
      ) : (
        <div className={style.container} key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => saveTodo(todo.id, { isDone: e.target.checked })}
          />
          <h2>{todo.title}</h2>
          <div className={style.buttonsContainer}>
            <button onClick={() => setEditing(true)}>Редактировать</button>
            <button onClick={() => remove(todo.id)}>Удалить</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ToDoItem;
