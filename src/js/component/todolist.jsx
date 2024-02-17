import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
	//declaración de estados
	const [task, setTask] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [user, setUser] = useState(""); 

	function updateList(user, todoList) {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todoList)
		})
			.then((response) => {
				if (response.status === 200) {
					getApiTask(user);
				}
				return response.json();
			})
			.then((result) => {
				console.log(result);

			})
			.catch((error) => console.error(error));
	}

	function deleteTask(taskToDelete) {
		const newTodoList = todoList.filter((item) => item !== taskToDelete);
		setTodoList(newTodoList);
		updateList(user, newTodoList);
	}

	function addTask(e) {
		if (e.key === "Enter") {
			const newTask = { label: task, done: false };
			const updatedTodoList = [...todoList, newTask]; // Agrega la nueva tarea a la lista existente
			setTodoList(updatedTodoList);
			updateList(user, updatedTodoList);
			setTask("");
		}
	}

	function getApiTask() {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
			.then((response) => response.json())
			.then((result) => {
				(result.msg && result.msg.includes("doesn't exist")) ? setTodoList([]) : setTodoList(result);
			})
			.catch((error) => console.log(error));
	}

	function userExists(user) {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
			.then(response => {
				return response.ok ? true : false;
			})
			.then(exists => {
				if (exists) {
					console.log("Usuario existe, obtener tareas.");
					getApiTask(user);
				} else {
					console.log("Usuario no existe, crear usuario primero.");
					createUser(user);
				}
			})
			.catch(error => {
				console.error('Error fetching users:', error);
			});
	}

	function createUser(user) {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify([]),
		})
			.then((response) => response.json())
			.then((result) => {
				console.log("Creamos el usuario y ahora obtenemos sus tareas");
				getApiTask(user);
			})
			.catch((error) => console.error(error));
	}

	function getUser(e, user) {
		if (e.key === "Enter") {
			setUser(user);
			console.log("he introducido un usuario: " + user);
			userExists(user);
		}
	}

	function deleteUser(user) {
		console.log(user);
		if (user === "") {
			alert("El usuario está vacío");
		} else {
			fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				redirect: "follow"
			})
				.then((response) => response.text())
				.then((result) => {
					console.log("Usuario eliminado.")
					setUser("");
					setTodoList([]);
				})
				.catch((error) => console.error(error));
		}
	}

	useEffect(() => {
		
	},[]);

	return (
		<>
			<h1 className="todo-title text-danger-emphasis text-center mt-5 mb-5 fw-light">todos</h1>

			<div className="input-group mb-3 todo-list m-auto">
				<input type="text" className="form-control" value={user} placeholder={(user === "") ? "Write here your username" : `${user}`} onKeyDown={e => { getUser(e, user) }} onChange={(e) => setUser(e.target.value)} />
				<button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e) => {deleteUser(user)}}>Eliminar usuario</button>
			</div>

			<div className="d-flex flex-column flex-md-row p-4 gap-4 align-items-center justify-content-center fw-light pb-0">
				<div className="todo-list list-group rounded-0 shadow ">
					<span className="list-group-item list-group-item-action d-flex gap-3 py-3 border border-light" aria-current="true">
						<div className="d-flex gap-2 w-100 justify-content-between">
							<input className="border border-0 form-control form-control-lg fw-light" type="text" value={task} placeholder={(todoList.length === 0) ? "No tasks, add a task" : "What needs to be done?"} onKeyDown={addTask} onChange={(e) => setTask(e.target.value)} />
						</div>
					</span>
					{todoList.map((item) =>
						<a href="#" key={item.id} className="task-info list-group-item list-group-item-action d-flex gap-3 py-3 border-light  p-4" aria-current="true">
							<div className="d-flex gap-2 w-100 justify-content-between">
								<div className="">{item.label}</div>
								<div className="delete-task text-danger" onClick={(e) => deleteTask(item)}>< FontAwesomeIcon icon={faX} /></div>
							</div>
						</a>
					)}
					<a href="#" className="list-group-item list-group-item-action d-flex gap-3 p-4 py-3 border-light" aria-current="true">
						<div className="d-flex gap-2 w-100 justify-content-between">
							<div className="text-black-50" style={{ fontSize: "10px" }}>
								{todoList.length} item{todoList.length !== 1 ? 's' : ''} left
							</div>
						</div>
					</a>
				</div>
			</div>
			<div className="todo-papers bg-transparent">
				<div className="todo-list list-group rounded-0 shadow bg-transparent">
					<div className="paper-one rounded-0 shadow-sm bg-transparent "></div>
					<div className="paper-two rounded-0 shadow-sm bg-transparent"></div>
				</div>
			</div>
		</>
	);
};
export default TodoList;