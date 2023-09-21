import React, { useState, FormEvent } from "react";
import { ITask } from "../interfaces/TodoInterface";

const InputForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const AddTask = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue === "") {
      return;
    }

    const data: ITask = {
      taskname: inputValue,
      completed: false,
    };

    fetch("api/v1/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      },
      body: JSON.stringify([data]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Task created successfully:", data);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
      setInputValue('');
  };

  return (
    <form id="form" onSubmit={AddTask}>
      <input
        type="text"
        placeholder="Enter Task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">New Task</button>
    </form>
  );
};

export default InputForm;
