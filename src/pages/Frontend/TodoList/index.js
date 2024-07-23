import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LOCAL_STORAGE_KEY = 'assign02Todos';
export default function TodoList() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
    const [selectedTodo, setSelectedTodo] = useState(null)

    const navigate = useNavigate();
    const handleCreateTodo = () => {
        navigate('/create-todo')
    }

    const storedTodos = todos;

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Delete Todo 
    const handleDeleteBtn = (todo) => {
        setSelectedTodo(todo);
    }
    const handleDeleteConfirm = () => {
        const updatedTodos = todos.filter((todo, i) => todo.todoId !== selectedTodo.todoId);
        setTodos(updatedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        toast.success("Delete todo successfully");

    }

    // Edit Todo.
    const handleEditBtn = ( todo) => {
        setSelectedTodo(todo);
    }
    
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedTodo({ ...selectedTodo, [name]: value });
    }
    const handleUpdateConfirm = () => {
        const updatedTodos = todos.map((todo) =>
            todo.todoId === selectedTodo.todoId ? selectedTodo : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        toast.success("Updated todo successfully");
    }

    return (
        <main>
            <div className="container-xl">
                <div className="row mt-5 mb-3 ">
                    <div className="col">
                        <h1 className='text-center' style={{ color: '#5a189a' }}>Todo List</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <button className='btn btn-primary mb-3' onClick={handleCreateTodo}>Create Todo</button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Location</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Date</th>
                                <th scope="col">UserId</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {storedTodos.map((todo, i) => (
                                <tr key={i}>
                                    <th scope='row'>{i + 1}</th>
                                    <td>{todo.title}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.location}</td>
                                    <td>{formatDate(todo.createdAt)}</td>
                                    <td>{formatDate(todo.date)}</td>
                                    <td>{todo.userId}</td>
                                    <td className='text-warning'>{todo.status}</td>
                                    <td>
                                        <button className="btn btn-sm btn-warning me-2 mb-sm-2" data-bs-toggle="modal" data-bs-target="#exampleModalEdit" onClick={() => { handleEditBtn(todo) }}>Edit</button>
                                        <button className="btn btn-sm btn-danger mb-sm-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { handleDeleteBtn(todo) }}>Delete</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div className="container-xl">

                {/* <!-- Delete Modal --> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: '#5a189a' }}>Delete Todo</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h6>Are you sure you want to delete this todo.</h6>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDeleteConfirm}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Edit Modal --> */}
                <div className="modal fade" id="exampleModalEdit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: '#5a189a' }}>Edit Todo</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {selectedTodo && (
                                    <form action="">
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="title" className="form-label fs-6">Title</label>
                                                <input type="text" className="form-control" id='title' name='title' value={selectedTodo.title}  onChange={handleEditChange} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="description" className="form-label fs-6">Description</label>
                                                <input type="text" className="form-control" id='description' name='description' value={selectedTodo.description}  onChange={handleEditChange} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="location" className="form-label fs-6">Location</label>
                                                <input type="text" className="form-control" id='location' name='location' value={selectedTodo.location}  onChange={handleEditChange} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="date" className="form-label fs-6">Date</label>
                                                <input type="date" className="form-control" id='date' name='date' value={selectedTodo.date}  onChange={handleEditChange} />
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="status" className="form-label fs-6">Status</label>
                                                {/* <input type="date" className="form-control" id='date' name='date' value={selectedTodo.status}  onChange={handleEditChange} /> */}
                                                <div className="row row-select mx-1" >
                                                <select name="status" id="status" className='form-control' value={selectedTodo.status} onChange={handleEditChange}>
                                                    <option value="" >Select</option>
                                                    <option value="Complete">Complete</option>
                                                    <option value="InComplete">Incomplete</option>
                                                </select>
                                                </div>
                                            </div>
                                        </div>

                                    </form>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleUpdateConfirm}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
