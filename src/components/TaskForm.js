import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./Icons";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask({ ...task, id: uuidv4() }));
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <div className="flex flex-col">
      <Link
        to="/"
        className="mb-4 font-semibold bg-orange-500 w-6/12 text-center items-center py-2 rounded-md"
      >
        <span className="text-white px-1" style={{ fontSize: "1em" }}>
          <Icon css="icon" icon={faUndoAlt} />
        </span>
        Return Back
      </Link>
      <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
        <label htmlFor="title" className="block text-sm font-bold mb-2">
          Title
        </label>
        <input
          name="title"
          type="text"
          placeholder="Title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        />

        <label htmlFor="description" className="block text-sm font-bold mb-2">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md bg-zinc-600 mb-2"
        />

        <button className="bg-indigo-600 w-full rounded-md font-semibold">
          Save
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
