import styles from "./TodoList.module.css";
import ToDoItem from "../ToDoItem/ToDoItem.tsx";
import { Todo, TodoInfo, TodoRequest } from "../../../types/ToDoTypes.ts";
import { deleteTodo, fetchAllTodo, updateTodo } from "../../../api/api.ts";
import { Dispatch, SetStateAction, useEffect } from "react";
interface TodoListProps {
  filter: string;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setInfo: Dispatch<SetStateAction<TodoInfo | undefined>>;
}
function TodoList({
  setInfo,
  filter,
  todos,
  setTodos,
  loading,
  setLoading,
}: TodoListProps) {
  const fetchData = async (filter?: string) => {
    try {
      setLoading(true);
      const data = await fetchAllTodo(filter);
      setTodos(data.data);
      setInfo(data.info);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  const handleDeleteClick = async (id: number) => {
    setLoading(true);
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleteing data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateClick = async (id: number, updatedTodo: TodoRequest) => {
    setLoading(true);
    try {
      const response = await updateTodo(id, updatedTodo);
      const result = todos.map((todo) =>
        todo.id === response.id ? response : todo,
      );
      setTodos(result);
    } catch (error) {
      console.error("Error updating data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      {!loading && (
        <div className={styles.card}>
          <h2 className={styles.h2}>Мои таски</h2>
          {todos.map((item) => (
            <ToDoItem
              key={item.id}
              todo={item}
              remove={handleDeleteClick}
              update={handleUpdateClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoList;
