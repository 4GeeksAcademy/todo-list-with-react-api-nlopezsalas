import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons"; 

const TodoList = () => {
	//declaración de estados
	const [task, setTask] = useState("");
	const [todoList, setTodoList] = useState([]);
	
    function addTask(e) {
		if (e.key === "Enter") {
			setTodoList(todoList.concat(task));
			setTask("");
		}
	}

	function deleteTask(index) {
		const updatedTodoList = todoList.filter((_, i) => i !== index);
		setTodoList(updatedTodoList);
	}
	return (
		<>
			<div className="container-fluid m-auto text-center">
				<input type="text" onKeyDown={addTask} onChange={(e) => setTask(e.target.value)} />
				<ul>
					{todoList.map((item, index) =>
						<li key={index}>
							{item}
							<span className="p-5" onClick={(e) => deleteTask(index)}>x</span>
						</li>)}
				</ul>
				<div>{todoList.length} item left</div>
			</div>
		</>
	);
};
export default TodoList;