	//convertir a json 
	// localStorage.setItem('todos', JSON.stringify(items));
	//coger los datos sin JSON.parse

	// const jsonString = '{"name": "John", "age": 30}';
	// const parsedData = JSON.parse(jsonString);



import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
	//declaración de estados
	const [task, setTask] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [user, setUser] = useState(""); // Inicialmente el usuario está vacío

	function addTask(e) {
		if (e.key === "Enter") {
			setTodoList(todoList.concat(task));
			setTask("");
		}
	}
	function deleteTask(index) {
		const updatedTodoList = todoList.filter((item, i) => i !== index);
		setTodoList(updatedTodoList);
	}

	function getApiTask() {
		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
			.then((response) => response.json())
			.then((result) => {
				if (result.msg && result.msg.includes("doesn't exist")) {
					setTodoList([]); // Si el usuario no existe, establecer todoList en un array vacío
				} else {
					setTodoList(result);
				}
			})
			.catch((error) => console.log(error));
	}

	function userExists(user) {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)
            .then(response => {
                if (response.ok) {
                    // Si la respuesta es exitosa, el usuario existe
                    return true;
                } else {
                    // Si la respuesta no es exitosa, el usuario no existe
                    return false;
                }
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
		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify([]),
			redirect: "follow"
		};

		fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				console.log("Creamos el usuario y ahora añadimos sus tareas");
				getApiTask(user);
			})
			.catch((error) => console.error(error));
	}

	useEffect(() => {
		const username = prompt("What's your username?");
		if (username) {
			setUser(username);
		}
	}, []);
	
	useEffect(() => {
		if (user) {
			userExists(user);
		}
	}, [user]);


	return (
		<>
			<h1 className="todo-title text-danger-emphasis text-center mt-5 mb-0 fw-light">todos</h1>
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
								<div className="delete-task text-danger" onClick={(e) => deleteTask(item.id)}>< FontAwesomeIcon icon={faX} /></div>
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