import axios from "axios";
import React, { useState } from "react";
import { backend_url } from "../URL";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Task = ({ task, onStatusChange, list, setList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleStatusChange = (newStatus) => {
    onStatusChange(newStatus);
  };

  const handleEditClick = () => {
    setEditedTask({ ...task });
    setIsEditing(true);
  };

  const handleModalClose = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    axios
      .put(backend_url + "/task/" + task._id, editedTask, {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        console.log(res);
        const updatedTask = res.data.task;
        const newList = list.map((ele) => {
          if (ele._id === task._id) {
            return { ...updatedTask };
          }
          return ele;
        });
        setList(newList);

        // Logic to handle successful update
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
    // setIsEditing(false);
  };

  const handleDeleteTask = () => {
    axios
      .delete(backend_url + "/task/" + task._id, {
        headers: {
          Authorization: localStorage.getItem("authorization"),
        },
      })
      .then((res) => {
        console.log(res);

        const newList = list.filter((ele) => ele._id !== task._id);
        setList(newList);
        setIsEditing(false);

        // Logic to handle successful update
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mb-4 p-4 border rounded-md flex items-start justify-between bg-gray-100">
      <div>
        <h4 className="text-lg font-semibold">{task.title}</h4>
        <p className="text-sm text-gray-500">{task.description}</p>
      </div>
      <div className="flex items-center">
        <span
          className={`px-2 py-1 text-white rounded-md ${
            task.priority === "Low"
              ? "bg-green-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          } mr-2`}
        >
          {task.priority}
        </span>
        <select
          value={task.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button
          onClick={handleEditClick}
          className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Edit
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black opacity-50 inset-0 fixed"></div>
          <div className="bg-white p-4 rounded-md z-10">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
              className="mb-2 p-2 w-full border rounded-md"
              placeholder="Title"
            />
            <textarea
              name="description"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
              className="mb-2 p-2 w-full border rounded-md"
              placeholder="Description"
            />
            <select
              name="priority"
              value={editedTask.priority}
              onChange={(e) =>
                setEditedTask({ ...editedTask, priority: e.target.value })
              }
              className="mb-2 p-2 w-full border rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <div className="flex items-center justify-between">
              <div>
                <RiDeleteBin6Fill
                  size={20}
                  color="red"
                  className="cursor-pointer"
                  onClick={handleDeleteTask}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleModalClose}
                  className="mr-2 px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
