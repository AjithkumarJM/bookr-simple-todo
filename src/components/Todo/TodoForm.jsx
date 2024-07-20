import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ addTask, editTask, editTaskHandler, showCompleted }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTask) {
      setText(editTask.text);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return;
    }
    if (editTask) {
      editTaskHandler(editTask.id, text);
      setText("");
    } else {
      const added = addTask(text);
      if (added) {
        setText("");
      }
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Add a new task"
        disabled={showCompleted}
      />
      <button type="submit" disabled={showCompleted}>
        {editTask ? "Edit Task" : "Add Task"}
      </button>
    </form>
  );
};

TodoForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  editTask: PropTypes.object,
  showCompleted: PropTypes.bool.isRequired,
  editTaskHandler: PropTypes.func.isRequired,
};

export default TodoForm;
