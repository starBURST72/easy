import { memo } from "react";
import { statusFilter } from "../../../constants/TodoConstants.ts";
import styles from "./TodoFilter.module.css";
import { TodoInfo } from "../../../types/ToDoTypes.ts";
interface TodoFilterProps {
  updateFilter: (status: string) => void;
  filter: string;
  info: TodoInfo | undefined;
}
function TodoFilter({ updateFilter, filter, info }: TodoFilterProps) {
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.button}
          disabled={filter === statusFilter.all}
          onClick={() => updateFilter(statusFilter.all)}
        >
          Все ({info && info.all})
        </button>
        <button
          className={styles.button}
          disabled={filter === statusFilter.inWork}
          onClick={() => updateFilter(statusFilter.inWork)}
        >
          В работе ({info && info.inWork})
        </button>
        <button
          className={styles.button}
          disabled={filter === statusFilter.completed}
          onClick={() => updateFilter(statusFilter.completed)}
        >
          Завершенные ({info && info.completed})
        </button>
      </div>
    </>
  );
}

export default memo(TodoFilter);
