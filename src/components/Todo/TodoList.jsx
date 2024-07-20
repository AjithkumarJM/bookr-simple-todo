import PropTypes from "prop-types";

const TodoList = ({ tasks, deleteTask, setEditTask, toggleTask, editTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
          </span>
          {task.completed && <span className="badge">Completed</span>}
          <button
            onClick={() => setEditTask(task)}
            disabled={task.completed || (editTask && editTask.id === task.id)}
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            disabled={editTask && editTask.id === task.id}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
  setEditTask: PropTypes.func.isRequired,
  toggleTask: PropTypes.func.isRequired,
  editTask: PropTypes.object,
};

export default TodoList;
