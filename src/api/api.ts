import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/ToDoTypes.ts";
export const API_ADDRESS = "https://easydev.club/api/v1";

export const token = "394badd151f838e17536fab3f960978a4b476f12";
export enum OUR_API_ENDPOINTS {
  admin = "admin",
  user = "user",
  todos = "todos",
}

export async function fetchTodo(id: number): Promise<Todo> {
  const response = await fetch(
    `${API_ADDRESS}/${OUR_API_ENDPOINTS.todos}/${id}`,
  );
  if (!response.ok) {
    throw new Error("Ошибка");
  }
  const data: Todo = await response.json();
  return data;
}

export async function fetchAllTodo(): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(`${API_ADDRESS}/${OUR_API_ENDPOINTS.todos}`);
  if (!response.ok) {
    throw new Error("Ошибка");
  }
  const data: MetaResponse<Todo, TodoInfo> = await response.json();
  return data;
}

export async function createTodo(request: TodoRequest): Promise<Todo> {
  const response = await fetch(`${API_ADDRESS}/${OUR_API_ENDPOINTS.todos}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Ошибка");
  }
  const data: Todo = await response.json();
  return data;
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(
    `${API_ADDRESS}/${OUR_API_ENDPOINTS.todos}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Ошибка");
  }
  return;
}

export async function updateTodo(
  id: number,
  request: TodoRequest,
): Promise<Todo> {
  const response = await fetch(
    `${API_ADDRESS}/${OUR_API_ENDPOINTS.todos}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    },
  );

  if (!response.ok) {
    throw new Error("Ошибка");
  }
  const data: Todo = await response.json();
  return data;
}
