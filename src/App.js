import './App.css';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Details from './pages/Details';
import AddEditBlog from './pages/AddEditBlog';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
     <h1>Blog CodeDAC</h1>
     {/* <Home></Home> */}
     <ToastContainer></ToastContainer>
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/details/:id' element={<Details></Details>}></Route>
      <Route path='/created' element={<AddEditBlog></AddEditBlog>}></Route>
      <Route path='/update/:id' element={<AddEditBlog></AddEditBlog>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
     </Routes>
    </div>
  );
}

export default App;
