import styles from "./todolist.module.css";
import { FormEvent, useEffect, useState } from "react";
import {
  createTodo,
  deleteTodo,
  fetchAllTodo,
  updateTodo,
} from "../../api/api.ts";
import { Todo, TodoRequest } from "../../types/ToDoTypes.ts";
import ToDoItem from "../ToDoItem/ToDoItem.tsx";

function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllTodo();
      setTodos(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const target = event.target as typeof event.target & {
      title: { value: string };
    };
    try {
      const newTodo = await createTodo({ title: target.title.value });
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error(error);
    } finally {
      target.title.value = "";
      setLoading(false);
    }
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <>
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <h2>Создать новую таску</h2>
        <input type="text" name="title" />
        <button type="submit">Добавить</button>
      </form>

      {!loading && (
        <div className={styles.container}>
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
    </>
  );
}

export default ToDoList;
