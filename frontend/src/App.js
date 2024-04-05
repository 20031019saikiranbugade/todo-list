import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<ProtectedRoutes Component={Login}/>} />
          <Route path="/register" element={<Register />} />
          <Route path='/user'>
            <Route path="home" element={<Home />} />
          </Route>
          
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
