// TaskForm.js

import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ ...taskData, status: "Todo", _id: Date.now().toString() });
    setTaskData({ title: "", description: "", priority: "Medium" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Add New Task</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 border rounded-md w-full"
        />
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 border rounded-md w-full"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleChange}
          className="p-2 border rounded-md w-full"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
