import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './pages/Routes';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import Forget from './pages/Auth/Forget';
// import Update from './pages/Auth/Update';
// import Landing from './pages/Frontend/Landing';
// import Header from './components/Header';
// import Home from './pages/Frontend/Home';
// import AddTodo from './pages/Frontend/AddTodo';
// import TodoList from './pages/Frontend/TodoList';
// import UserList from './pages/Frontend/UserList';


function App() {
  return (
   <>
    <ToastContainer />
    <BrowserRouter>
    <Routes />
    
    </BrowserRouter>
    {/* <Login /> */}
    {/* <Forget /> */}
    {/* <Update /> */}
    {/* <Landing /> */}
    {/* <Header /> */}
    {/* <Home /> */}
    {/* <AddTodo /> */}
    {/* <TodoList /> */}
    {/* <UserList /> */}
   </>
  );
}

export default App;
