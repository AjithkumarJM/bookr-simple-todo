import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "../store/todoSlice";
import TodoForm from "../components/Todo/TodoForm";
import TodoList from "../components/Todo/TodoList";
import { debounce } from "../utils/debounce";

const TodoPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [editTask, setEditTask] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) => {
        const matchesSearch = task.text
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCompletion = showCompleted ? task.completed : true;
        return matchesSearch && matchesCompletion;
      })
    );
  }, [searchTerm, tasks, showCompleted]);

  const handleAddTask = (text) => {
    if (tasks.some((task) => task.text.toLowerCase() === text.toLowerCase())) {
      setErrorMessage("Task already exists");
      return false;
    }
    const newTask = { id: Date.now(), text, completed: false };
    dispatch(addTodo(newTask));
    setErrorMessage("");
    return true;
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTask = (id, text) => {
    dispatch(editTodo({ id, text }));
    setEditTask(null);
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTodo(id));
  };

  const debouncedSearch = debounce((term) => {
    setSearchTerm(term);
  }, 300);

  const onSearchInputChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleFilterCompleted = () => {
    setShowCompleted((prevState) => !prevState);
  };

  if (!isAuthenticated) {
    return <div>Please log in to view your tasks.</div>;
  }

  return (
    <div className="container">
      <button onClick={() => dispatch(logout())}>Logout</button>
      <h2>Todo List</h2>
      {tasks.length === 0 && <p>Add tasks</p>}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={onSearchInputChange}
          disabled={tasks.length === 0}
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <TodoForm
        showCompleted={showCompleted}
        addTask={handleAddTask}
        editTask={editTask}
        editTaskHandler={handleEditTask}
      />
      <button onClick={handleFilterCompleted} disabled={tasks.length === 0}>
        {showCompleted ? "Show All Tasks" : "Show Completed Tasks"}
      </button>
      <TodoList
        tasks={filteredTasks}
        deleteTask={handleDeleteTask}
        setEditTask={setEditTask}
        toggleTask={handleToggleTask}
        editTask={editTask}
      />
    </div>
  );
};

export default TodoPage;
