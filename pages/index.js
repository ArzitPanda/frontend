// Home.js

import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task,
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-screen-lg w-full p-4">
        <TaskForm onAddTask={addTask} />

        <div className="flex  flex-col gap-2 md:flex-row justify-between mt-8">
          <TaskList
            title="Todo"
            tasks={tasks.filter((task) => task.status === "Todo")}
            onStatusChange={(taskId, newStatus) =>
              updateTaskStatus(taskId, newStatus)
            }
          />

          <TaskList
            title="In Progress"
            tasks={tasks.filter((task) => task.status === "In Progress")}
            onStatusChange={(taskId, newStatus) =>
              updateTaskStatus(taskId, newStatus)
            }
          />

          <TaskList
            title="Done"
            tasks={tasks.filter((task) => task.status === "Done")}
            onStatusChange={(taskId, newStatus) =>
              updateTaskStatus(taskId, newStatus)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
