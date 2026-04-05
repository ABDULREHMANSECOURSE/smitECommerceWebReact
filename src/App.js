import './App.css';
import { Home } from './Home';
import LogInSignUp from './LoginSignup';
import {AddProduct} from './addProduct';
import Shop from './Products';
import { Profile, About, Contact, Orders } from './DummyPages';
import Cart from './Cart';
import Wishlist from './Wishlist';
import Search from './Search';
import ProductDetail from './ProductDetail';
import Navbar from './components/header/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/products" element={<Shop />}/>
      <Route path="/product/:id" element={<ProductDetail />}/>
      <Route path='/account' element={<LogInSignUp/>}/>
      <Route path='/addProduct' element={<AddProduct/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/orders' element={<Orders/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
