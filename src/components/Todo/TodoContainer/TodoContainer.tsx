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
    if (target.title.value === "") {
      return;
    }
    try {
      const newTodo = await createTodo({ title: target.title.value });
      setTodos([...todos, newTodo]);
      target.title.value = "";
    } catch (error) {
      console.error(error);
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
