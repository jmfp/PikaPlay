import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import './Sass/main.scss';
//import Register from './pages/Register';
import QueryPage from './pages/QueryPage';
import Info from './pages/Info';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {/*<Route path="/register" element={<Register/>}/>*/}
          <Route path="/query/:limit/:offset" element={<QueryPage/>}/>
          <Route path="/info/:pokeName" element={<Info/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
