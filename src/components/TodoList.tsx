import React from "react";
import "./styles.css";
import { Todo } from "../models/Todo";
import SingleTodo from "./SingleTodo";

interface Props {
  todos: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="container">
      <div className={"todos "}>
        <span className="todos__heading">Active tasks</span>
        {todos.map((todo) =>
          !todo.isDone ? (
            <SingleTodo
              todo={todo}
              todos={todos}
              key={todo.id}
              setTodos={setTodos}
            />
          ) : null
        )}
      </div>

      <div className={"todos remove "}>
        <span className="todos__heading">Completed tasks</span>
        {todos.map((todo) =>
          todo.isDone ? (
            <SingleTodo
              todo={todo}
              todos={todos}
              key={todo.id}
              setTodos={setTodos}
            />
          ) : null
        )}
      </div>
    </div>
  );
};

export default TodoList;
