import './App.css';
import { Home } from './Home';
import LogInSignUp from './LoginSignup';
import {AddProduct} from './addProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- add this

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/account' element={<LogInSignUp/>}/>
      <Route path='/addProduct' element={<AddProduct/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
