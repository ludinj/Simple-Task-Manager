import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../models/Todo";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiUndo } from "react-icons/bi";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos((pre) =>
      pre.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos((pre) => pre.filter((todo) => todo.id !== id));
  };

  const handleEddit = () => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((pre) =>
      pre.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <form
      className={`todos__single `}
      onSubmit={(e) => handleSubmit(e, todo.id)}
    >
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
          ref={inputRef}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div className="icon_container">
        <span className="icon" onClick={handleEddit}>
          {todo.isDone ? null : <AiFillEdit />}
        </span>
        <span className="icon">
          <AiFillDelete onClick={() => handleDelete(todo.id)} />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          {todo.isDone ? <BiUndo /> : <MdDone />}
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
