import { FormEvent, useCallback, useState } from "react";
import ToDoAddForm from "../TodoAddForm/ToDoAddForm.tsx";
import TodoList from "../TodoList/TodoList.tsx";
import styles from "./TodoContainer.module.css";
import { createTodo } from "../../../api/api.ts";
import TodoFilter from "../TodoFilter/TodoFilter.tsx";
import { statusFilter } from "../../../constants/TodoConstants.ts";
import { Todo, TodoInfo } from "../../../types/ToDoTypes.ts";

function TodoContainer() {
  const [filter, setFilter] = useState(statusFilter.all);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");
  const [info, setInfo] = useState<TodoInfo | undefined>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
    };
    if (target.title.value.length < 2 || target.title.value.length > 64) {
      setError("Описание задачи должно содержать от 2 до 64 символов.");
      return;
    }
    try {
      const newTodo = await createTodo({ title: target.title.value });
      setTodos([...todos, newTodo]);
      target.title.value = "";
      setError(""); // Сброс ошибки после успешного создания задачи
    } catch (error) {
      console.error(error);
      setError("Ошибка при создании задачи. Пожалуйста, попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };
  const updateFilter = useCallback(
    (status: string) => {
      setFilter(status);
    },
    [setFilter],
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.h1}>To Do List</h1>
      </div>

      <TodoFilter updateFilter={updateFilter} filter={filter} info={info} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ToDoAddForm handleSubmit={handleSubmit} />
      <TodoList
        setInfo={setInfo}
        filter={filter}
        todos={todos}
        setTodos={setTodos}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}

export default TodoContainer;
