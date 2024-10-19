import { memo } from "react";
import { statusFilter } from "../../../constants/TodoConstants.ts";
import styles from "./TodoFilter.module.css";
interface TodoFilterProps {
  updateFilter: (status: string) => void;
  filter: string;
}
function TodoFilter({ updateFilter, filter }: TodoFilterProps) {
  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.button}
          disabled={filter === statusFilter.all}
          onClick={() => updateFilter(statusFilter.all)}
        >
          Все
        </button>
        <button
          className={styles.button}
          disabled={filter === statusFilter.inWork}
          onClick={() => updateFilter(statusFilter.inWork)}
        >
          В работе
        </button>
        <button
          className={styles.button}
          disabled={filter === statusFilter.completed}
          onClick={() => updateFilter(statusFilter.completed)}
        >
          Завершенные
        </button>
      </div>
    </>
  );
}

export default memo(TodoFilter);
