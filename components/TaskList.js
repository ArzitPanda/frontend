// TaskList.js

import React from "react";
import Task from "./Task";

const TaskList = ({ title, tasks, onStatusChange, list, setList }) => {
  return (
    <div className="flex-1 p-4 bg-white rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {tasks.map((task) => (
        <Task
          key={task._id}
          task={task}
          list={list}
          setList={setList}
          onStatusChange={(newStatus) => onStatusChange(task._id, newStatus)}
        />
      ))}
    </div>
  );
};

export default TaskList;
