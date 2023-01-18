import { useState, useEffect } from 'react';
import './App.css';
import "./style.css";
import "./media-queries.css";
import Home from './pages/Home';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Details from './pages/Details';
import AddEditBlog from './pages/AddEditBlog';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Auth from './pages/Auth';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import BackToTopButton from './components/BackToTopButton'
import Footer from './pages/Footer';

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    }); 
  }

  return (
    <div className="App">
     <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout}></Header>
     <ToastContainer position='top-center'></ToastContainer>
     <Routes>
      <Route path='/' element={<Home setActive={setActive} user={user}></Home>}></Route>
      <Route path='/details/:id' element={<Details setActive={setActive}></Details>}></Route>
      <Route path='/created' element={user?.uid ? <AddEditBlog user={user}></AddEditBlog> : <Navigate to="/"></Navigate>}></Route>
      <Route path='/update/:id' element={user?.uid ? <AddEditBlog user={user} setActive={setActive}></AddEditBlog> : <Navigate to="/"></Navigate>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/auth' element={<Auth setActive={setActive} setUser={setUser}></Auth>}></Route>
      <Route path='*' element={<NotFound></NotFound>}></Route>
     </Routes>
     <BackToTopButton></BackToTopButton>
     <Footer></Footer>
    </div>
  );
}

export default App;
