import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/taskSlice";
import { Link } from "react-router-dom";

function TaksList() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-8/12">
      <header className="flex justify-between items-center py-4 w-full">
        <h1 className="font-semibold items-center flex justify-start w-4/12">
          Tasks Quantity :
          <span className="bg-zinc-600 items-center rounded-md mx-1 px-2 w-1/6 text-center">
            {tasks.length}
          </span>
        </h1>
        <Link
          to="/create-task"
          className="bg-indigo-600 px-2 py-1 rounded-md text-sm"
        >
          Create task
        </Link>
      </header>

      <div className="lg:grid lg:grid-cols-3 lg:gap-3 flex flex-col gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 rounded-md p-4">
            <header className="flex justify-between">
              <h3>{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-1 text-xs rounded-md"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 px-2 py-1 text-xs rounded-md"
                >
                  Delete
                </button>
              </div>
            </header>
            <p className="bg-zinc-600 mt-4 rounded-md py-2 px-1">
              {task.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaksList;
