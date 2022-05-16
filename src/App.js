import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";

import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import VolcanoList from './components/VolcanoList';
import VolcanoDetails from './components/VolcanoDetails';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<VolcanoList />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />}></Route>
          <Route path="/volcanoDetails" element={<VolcanoDetails currentUser={currentUser} />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
