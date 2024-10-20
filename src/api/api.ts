import {
  MetaResponse,
  Todo,
  TodoInfo,
  TodoRequest,
} from "../types/ToDoTypes.ts";
export const API_ADDRESS = "https://easydev.club/api/v1";

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
  return await response.json();
}

export async function fetchAllTodo(
  filter?: string,
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await fetch(
    `${API_ADDRESS}/${OUR_API_ENDPOINTS.todos}?filter=${filter}`,
  );
  if (!response.ok) {
    throw new Error("Ошибка");
  }
  return await response.json();
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
  return await response.json();
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
  return await response.json();
}
