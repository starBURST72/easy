import { FormEvent } from "react";
import style from "./TodoAddForm.module.css";
interface TodoAddFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}
function ToDoAddForm({ handleSubmit }: TodoAddFormProps) {
  console.log("rerender addform");
  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <div className={style.card}>
        <h2>Создать новую таску</h2>
        <div>
          <input className={style.input} type="text" name="title" />
          <button className={style.button} type="submit">
            Добавить
          </button>
        </div>
      </div>
    </form>
  );
}

export default ToDoAddForm;
