import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons"; 

const TodoList = () => {
	//declaración de estados
	const [task, setTask] = useState("");
	const [todoList, setTodoList] = useState([]);
	// function addTask(e) {
	// 	if (e.key === "Enter") {
	// 		setTodoList(todoList.concat(task));
	// 		setTask("");
	// 	}
	// }

	function addTask(e) {
		e.preventDefault(); // Prevent form submission
		if (task.trim() !== "") { // Check if the task is not empty
			setTodoList(todoList.concat(task)); // Add task to the todo list
			setTask(""); // Clear the input field
		}
	}
	function deleteTask(index) {
		const updatedTodoList = todoList.filter((_, i) => i !== index);
		setTodoList(updatedTodoList);
	}
	return (
		<>
			{/* <div className="container-fluid m-auto text-center">
				<input type="text" onKeyDown={addTask} onChange={(e) => setTask(e.target.value)} />
				<ul>
					{todoList.map((item, index) =>
						<li key={index}>
							{item}
							<span className="p-5" onClick={(e) => deleteTask(index)}>x</span>
						</li>)}
				</ul>
				<div>{todoList.length} item left</div>
			</div> */}
			<h1 className="text-danger-emphasis text-center mt-5 fw-light">todos</h1>
			<div className="d-flex flex-column flex-md-row p-4 gap-4 align-items-center justify-content-center fw-light">
				<div className="todo-list list-group rounded-0 shadow ">
					<a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3 border-light" aria-current="true">
						<div className="d-flex gap-2 w-100 justify-content-between">
							<form className="w-100 row m-auto" onSubmit={addTask}>
								<input className="border border-0 form-control form-control-lg fw-light" type="text" value={task} placeholder={(todoList.length === 0) ? "No tasks, add a task": ""} onChange={(e) => setTask(e.target.value)} />
							</form>
						</div>
					</a>
					{todoList.map((item, index) =>
						<a href="#" className="task-info list-group-item list-group-item-action d-flex gap-3 py-3 border-light" aria-current="true">
							<div key={index} className="d-flex gap-2 w-100 justify-content-between">
								<div className="">{item}</div>
								<div className="delete-task text-danger" onClick={(e) => deleteTask(index)}>< FontAwesomeIcon icon={faX} /></div>
							</div>
						</a>
					)}
					<a href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3 border-light" aria-current="true">
						<div className="d-flex gap-2 w-100 justify-content-between">
							<div className="text-black-50" style={{ fontSize: "12px" }}>{todoList.length} item left</div>
						</div>
					</a>
				</div>
			</div>
		</>
	);
};
export default TodoList;