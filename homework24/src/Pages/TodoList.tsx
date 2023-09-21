import React, { useEffect, useState } from "react";
import { ITask, ITodoList } from "../interfaces/TodoInterface";


const TodoList: React.FC<ITodoList> = ({isCompleted}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("api/v1/todo", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const responseData = await response.json();
        const data: ITask[] = responseData.items;
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [tasks]);

  const onDelete = (id?: string) => {
    fetch(`api/v1/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
    });
  };
  const onComplete = (id?: string) => {
    fetch(`api/v1/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify({ completed: true }),
    });
  };

  return (
    <div className="list" >
      <h1>{isCompleted ? "Completed Tasks" : "To Do Tasks"}</h1>
      {tasks.map(({ completed, taskname, _uuid }) =>
        completed === isCompleted ? (
          <div key={_uuid} style={{ border: "2px solid #000" }}>
            {taskname}
            <div>
              <button onClick={() => onComplete(_uuid)}>COMPLETE</button>
              <button onClick={() => onDelete(_uuid)}>DELETE</button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default TodoList;
