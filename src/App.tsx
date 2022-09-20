import logo from './logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState
} from "react";
import { v1 as uuid } from "uuid";
import '@contentstack/venus-components/build/main.css';

import "./styles/App.css";
import "./styles/darkTheme.css"
import { ToggleSwitch } from '@contentstack/venus-components';
import { State, Todo } from './Types';

// import { createTodoAction, deleteTodoAction, editTodoAction, selectedTodoAction, toggleDataAction } from './components/redux-og';
import { createTodoAction, deleteTodoAction, editTodoAction, selectedTodoAction, toggleDataAction, toggleThemeAction } from './components/redux-toolkit';



function App() {
  const [newTodoInput, setNewTodoInput] = useState("");
  const [editTodoInput, setEditTodoInput] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const editInput = useRef<HTMLInputElement>(null);

  const todos = useSelector((state: State) => state.todos)
  const dispatch = useDispatch();
  const selectedTodoId = useSelector((state: State) => state.selectedTodo);
  const editedCount = useSelector((state: State) => state.counter);
  const theme = useSelector((state: State) => state.theme);
  const selectedTodo = (selectedTodoId && todos.find(todo => todo.id === selectedTodoId)) || null;

  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoInput(e.target.value);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTodoInput(e.target.value);
  };

  const handleCreateNewTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    dispatch(createTodoAction({ desc: newTodoInput }));
    setNewTodoInput("");
  };

  const handleSelectTodo = (todoId: string) => (): void => {
    console.log("todoid:", todoId);

    dispatch(selectedTodoAction({ id: todoId }))
  };

  const handleEdit = (): void => {
    if (!selectedTodo) return;

    setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
      editInput?.current?.focus();
    }
  }, [isEditMode]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!editTodoInput.length || !selectedTodoId) {
      handleCancelUpdate();
      return
    }
    dispatch(editTodoAction({ id: selectedTodoId, desc: editTodoInput }))
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleCancelUpdate = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e?.preventDefault();
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleToggle = (): void => {
    if (!selectedTodoId || !selectedTodo) return;

    dispatch(toggleDataAction({ id: selectedTodoId, isComplete: !selectedTodo.isComplete }))
  };

  const handleDelete = (): void => {
    if (!selectedTodoId) return;

    dispatch(deleteTodoAction({ id: selectedTodoId }));
  };

  const handlethemeToggle = (): void => {
    dispatch(toggleThemeAction({ theme: !theme }))
  }
  const checkedProp = true;
  return (
    <div className={`App ${theme ? "dark" : ""}`} >
      {/* <div className="App__counter">Todos Updated Count: {editedCount}</div> */}
      <div className='App__navbar'>
        <div className="App__counter">Todos Updated Count: {editedCount}</div>
        <div className='App__theme'>
          Theme: {theme ? "dark" : "light"}
          <ToggleSwitch
            labelColor="primary"
            labelPosition="left"
            onChange={handlethemeToggle}
            onClick={function noRefCheck() { }}
            testId="cs-toggle-switch"
            // checked= {checkedProp}
          />
          {/* <div className='toggle-switch'>
            <label>
              <input type='checkbox' />
              <span className='slider'></span>
            </label>
          </div> */}
        </div>
      </div>

      <div className="App__header">
        <h1>Todo: Redux vs RTK Edition</h1>
        <form  className="" onSubmit={handleCreateNewTodo}>
          <label htmlFor="new-todo">Add new:</label>
          <input
            onChange={handleNewInputChange}
            id="new-todo"
            value={newTodoInput}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="App__body">
        <ul className="App__list">
          <h2>My Todos:</h2>
          {todos.map((todo, i) => (
            <li
              className={`${todo.isComplete ? "done" : ""} ${todo.id === selectedTodoId ? "active" : ""
                }`}
              key={todo.id}
              onClick={handleSelectTodo(todo.id)}
            >
              <span className="list-number">{i + 1})</span> {todo.desc}
            </li>
          ))}
        </ul>
        <div className="App_todo-info">
          <h2>Selected Todo:</h2>
          {selectedTodo === null ? (
            <span className="empty-state">No Todo Selected</span>
          ) : !isEditMode ? (
            <>
              <span
                className={`todo-desc ${selectedTodo?.isComplete ? "done" : ""
                  }`}
              >
                {selectedTodo.desc}
              </span>
              <div className="todo-actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleToggle}>Toggle</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor="edit-todo">Edit:</label>
              <input
                ref={editInput}
                onChange={handleEditInputChange}
                value={editTodoInput}
              />
              <button type="submit">Update</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
