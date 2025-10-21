import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header.jsx'
import { ProductCard } from './components/productCard.jsx'
import Test from './components/test..jsx';
import HomePage from './pages/homePage.jsx';
import LoginPage from './pages/loginPage.jsx';
import RegisterPage from './pages/registerPage.jsx';
import AdminPage from './pages/adminPage.jsx';
import TestPage from './pages/test.jsx';
import { Toaster } from 'react-hot-toast';


function App() {
  
  return (

    // rap with browser router after install react-dom 
    <BrowserRouter> 
      <Toaster position='top-right'/>
      
      {/* here you need to give h-screen for hight beacuse it doesn't have another <div> to predict what is hight */}
      <div className='w-full h-screen bg-primary text-secondary'>

        <Routes>

          <Route path="/*" element={<HomePage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/admin/*" element={<AdminPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
