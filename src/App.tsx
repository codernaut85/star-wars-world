import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './styles/App.css';
import './styles/layout.css';
import Home from './components/home';
import Person from './components/person/';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/people/" element={<Home />} />
        <Route path="/people/:id" element={<Person />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
