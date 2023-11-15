// Home.js

import React, { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import axios from "axios";
import { backend_url } from "../URL";

const Home = () => {

const router  = useRouter()
useEffect(()=>{


  if(localStorage.getItem("authorization").length ===0)
  {
    router.push("/login")

  }
  else
  {
   ( async () => {
      try {
        const response = await axios.get(backend_url + "/task/",{
          headers: {
            'Authorization': localStorage.getItem("authorization")
          }
        });
        const tasksData = response.data?.tasks;
        setTasks(tasksData);
      } catch (error) {
        console.log(error);
      }
    })();

   

  }




},[])




  const [tasks, setTasks] = useState([]);

  const addTask =async (task) => {

  
   
       setTasks([...tasks, task]);

     
    
    
     


  };

  const updateTaskStatus = (taskId, newStatus) => {
    // Update task status in the backend
    axios.put(backend_url + "/task/" + taskId, { status: newStatus }, {
      headers: {
        'Authorization': localStorage.getItem("authorization")
      }
    })
      .then(response => {
        // Update task status in the frontend
        const updatedTasks = tasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
    <Navbar/>
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
    </>
  );
};

export default Home;
