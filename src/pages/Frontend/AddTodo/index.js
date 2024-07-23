import React, { useState } from 'react'
import { toast } from 'react-toastify';

    const uniqueId = () => Math.random().toString(36).slice(4);
    const initialState = {title:'', description:'', location:'', date:''};
    const LOCAL_STORAGE_KEY = 'assign02Todos'
export default function AddTodo() {
    // const [storedtodo, setStoredTodo] = (JSON.parse(localStorage.getItem('assign02Todos')) || []) 
    const [state,setState] = useState(initialState);
    const [todos,setTodos] = useState(JSON.parse(localStorage.getItem('assign02Todos')) || []);

    const currentUser = JSON.parse(localStorage.getItem('CurrentUser')) || []
    // console.log(currentUser);

    const handleChange = (e) => {
        setState(s => ({...s,[e.target.name]: e.target.value}));
    }

    const handleAddTodo = (e) => {
        e.preventDefault();
        const {title, description, location, date} = state;

        if(title === '' || description === '' || location === '' || date === ''){return toast.warning("All Fields are must required")}

        let todo = {
            title,
            description,
            location,
            date,
            createdAt: new Date(),
            status: "InComplete",
            userId: currentUser.id,
            todoId: uniqueId()
        }

        const updatedTodos = [...todos,todo];
        setTodos(updatedTodos);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
        toast.success("Added Successfully");
        setState(initialState);
    }


    return (
        <main className='d-flex align-items-center justify-content-center'>
            <div className="card card-todo">
                <form action="">
                    <div className="row">
                        <div className="col">
                            <h2 className='text-center' style={{color:'#5a189a'}}>Create Todo</h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="title" className="form-label fs-6">Title</label>
                            <input type="text" className="form-control" id='title' name='title' value={state.title} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="description" className="form-label fs-6">Description</label>
                            <input type="text" className="form-control" id='description' name='description' value={state.description} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="location" className="form-label fs-6">Location</label>
                            <input type="text" className="form-control" id='location' name='location' value={state.location} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="date" className="form-label fs-6">Date</label>
                            <input type="date" className="form-control" id='date' name='date' value={state.date} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mx-5">
                            <button className='btn add-btn' onClick={handleAddTodo}>Add</button>
                    </div>
                </form>
            </div>
        </main>
    )
}
