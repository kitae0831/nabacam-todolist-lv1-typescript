import "./App.css";
import { useState } from "react";
import Todo from "./components/Todo";
import { Todos } from "./types/todo.types";

// any 타입은 타입을 선언안하겠다! => 자바스크립트를 쓰는 것과 같은 것!
// 굳이 any 타입을 써야한다면 unknown 타입을 써라.

// type TodoList = {
//   id: number;
//   title: string;
//   content: string;
// };

// type GetTodoList<T> = T & { key: number };

function App() {
  // 타입스크립트의 제네릭
  const [todo, setTodo] = useState<Todos[]>([
    { id: 1, title: "물마시기", content: "하루에 세번 물마시기" },
  ]);

  const [doneTodo, setDoneTodo] = useState<Todos[]>([
    { id: 2, title: "운동하기", content: "공복유산소" },
  ]);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState(""); //이미 ()안에 제시한 값에 대해 useState가 자동타입추론을 한다!

  //할일 추가 기능
  const addTodoHandler = () => {
    // id는 고유해야함.
    const newTodo: Todos = {
      id: todo.length + doneTodo.length + 1,
      title,
      content,
    };

    // 값이 없다. 문자열이 비어있거나 값이 아예 할당이 안되어 있거나(null 또는 undefined)
    // if (title === "" && content === "") alert("형식을 채워주세요");
    if (!title && !content) alert("형식을 채워주세요");
    // else setTodo([...todo, newTodo]);
    else setTodo((prevTodo) => [...prevTodo, newTodo]);

    // 의존성이 적어질수록 사이드 이펙트가 적어진다.

    setTitle("");
    setContent("");
  };

  //todo 삭제
  // 유지보수가 좋아진다. 의존성이 있기에 가능하다. (id: number) => (id: Todos["id"])
  const deleteTodoHandler = (id: Todos["id"]) => {
    setTodo(todo.filter((item) => item.id !== id));

    // setTodo((prevTodo) => prevTodo.filter((item) => item.id !== id));
  };

  //done 삭제
  const deleteDoneHandler = (id: number) => {
    setDoneTodo(doneTodo.filter((item) => item.id !== id));
  };

  //todo -> done
  const doneTodoHandler = (newDoneTodo: Todos) => {
    // const newDoneTodo = {
    //   id: item.id,
    //   title: item.title,
    //   content: item.content,
    // };

    setDoneTodo((prevDoneTodo) => [...prevDoneTodo, newDoneTodo]);
    setTodo((prevTodo) =>
      prevTodo.filter((todo) => todo.id !== newDoneTodo.id)
    );
  };

  // done -> todo
  const doneResetHandler = (item: Todos) => {
    const newTodo = {
      id: item.id,
      title: item.title,
      content: item.content,
    };
    setTodo([...todo, newTodo]);
    setDoneTodo(doneTodo.filter((i) => i.id !== item.id));
  };

  return (
    <div className="layout">
      <div className="input-wrpper">
        <span>제목</span>
        <input
          type="text"
          value={title}
          // onChange에 event 파라미터 추가 후 event.target.value 값으로
          // 현재 input에 입력된 데이터를 받아올 수 있고 그 값을 setTitle에 넣어줌
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <span>내용</span>
        <input
          type="text"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button className="inputBtn" onClick={addTodoHandler}>
          추가하기
        </button>
      </div>
      <div className="todo-container">
        <h1> 📝 In progress</h1>
        <div className="todo-lists">
          {todo.map((todoItem) => {
            return (
              <Todo
                key={todoItem.id}
                todo={todoItem}
                firstBtnHandler={deleteTodoHandler}
                secondBtnHandler={doneTodoHandler}
                firstBtn="삭제하기"
                secondBtn="완료하기"
              />
            );
          })}
        </div>
        <h1> 💯 Done</h1>
        <div>
          <div className="todo-lists">
            {/* 입력된 todo들이 들어옴 */}
            {doneTodo.map((doneTodoItem) => {
              return (
                <Todo
                  todo={doneTodoItem}
                  key={doneTodoItem.id}
                  firstBtnHandler={deleteDoneHandler}
                  secondBtnHandler={doneResetHandler}
                  firstBtn="삭제하기"
                  secondBtn="취소하기"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
