import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Tasks.css"; // Assuming you have a CSS file for styling
export default function Task({ Category }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found");
      return null;
    }
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userid;
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/task/api/get/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Fetched Tasks:", response.data);
        if (!response.data.success) {
          console.error("Failed to fetch tasks:", response.data.message);
          return;
        }
        setTasks(response.data.tasks);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div class="relative h-full w-full bg-slate-950">
      <div class="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]">
        <div className="task-container">
          <h2>Task List</h2>
          {tasks
            .filter((task) => task.category === Category)
            .map((task) => (
              <div key={task._id} className="task-item">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Category: {task.category}</p>
                <p>Priority: {task.priority}</p>
                <p>Due Date: {task.duedate}</p>
                <p>Status: {task.completed ? "Completed" : "Pending"}</p>
                <button>
                  Mark as {task.completed ? "Pending" : "Completed"}
                </button>
                <button>Edit Task</button>
                <button>Delete Task</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
