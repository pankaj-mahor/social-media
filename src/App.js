
import './App.css';
import {Routes  , Route, BrowserRouter} from 'react-router-dom'
import Main from './pages/Main';
import Login from './pages/Login';  
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
