import React from 'react';
import { useNavigate } from 'react-router-dom';
import peopleSvg from '../../../assets/undraw_people.svg'
import todoSvg from '../../../assets/undraw_todo_list.svg' 
// import bdImg from '../../../assets/bg.webp';


export default function Home() {
  const navigate = useNavigate();

  const handleUserCard = () => {
      navigate('/user-list');
  }
  const handleTodoCard = () => {
    navigate('/todo-list');
  }

  return (
    <main className='d-flex align-items-center justify-content-center flex-wrap bg-img'> 
      <div className="card-home mb-5">
        <div className="card-details">
          <img src={peopleSvg} alt="" height={60} width={140} />
          <p className="text-title">Users</p>
          <p className="text-body ">How many users are added.</p>
        </div>
        <button className="card-button" onClick={handleUserCard}>More info</button>
      </div>
      <div className="card-home mb-5">
        <div className="card-details">
        <img src={todoSvg} alt="" height={60} width={140} />
          <p className="text-title ">Todos</p>
          <p className="text-body ">Check here added todos.</p>
        </div>
        <button className="card-button" onClick={handleTodoCard}>More info</button>
      </div>

    </main>
  )
}
