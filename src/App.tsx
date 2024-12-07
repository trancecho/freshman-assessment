import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.tsx';
import CustomerService from './CustomerService';

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-service" element={<CustomerService />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
