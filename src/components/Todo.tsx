import { Todos } from "../types/todo.types";

interface TodoProps {
  todo: Todos;
  firstBtn: string;
  secondBtn: string;
  firstBtnHandler: (id: number) => void;
  secondBtnHandler: (todo: Todos) => void;
}

function Todo(props: TodoProps) {
  const { todo, firstBtn, secondBtn, firstBtnHandler, secondBtnHandler } =
    props;

  return (
    <div className="todo-box">
      <p className="title">{todo.title}</p>
      <p className="content">{todo.content}</p>
      <button className="first-btn" onClick={() => firstBtnHandler(todo.id)}>
        {firstBtn}
      </button>
      <button className="second-btn" onClick={() => secondBtnHandler(todo)}>
        {secondBtn}
      </button>
    </div>
  );
}

export default Todo;
