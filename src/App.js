import './App.css';
import Header from './components/Header/index';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/views/Home/index.js';
import Footer from './components/Footer';

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>

                <Footer/>
            </Router>
        </div>
    );
}

export default App;
