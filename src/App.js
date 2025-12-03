import './App.css';
import { Home } from './Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // <-- add this

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
