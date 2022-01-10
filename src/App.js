import './App.css';
import Header from './components/Header/index';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/views/Home/index.js';
import Footer from './components/Footer';
import Onboarding from "./components/views/Onboarding";
import Dashboard from "./components/views/Dashboard";
import Profile from "./components/views/Profile";
import GuardRoute from './GuardRoute';
import {useEffect, useState} from 'react';

import {useDispatch} from 'react-redux';

import {auth} from './firebase';
import SignIn from "./components/views/Signin";


function App() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [show, setShow] = useState(false);


    useEffect(() => {

        setLoading(true);

        auth.onAuthStateChanged(function (user) {
            // setUser(user);
            dispatch({type: 'AUTH', payload: user});


        });

        setLoading(false);


    }, []);


    return (
        <div className="App">
            <Router>
                <Header setShow={setShow}
                />
                <Routes>
                    <Route path="/" element={<Home setShow={setShow} />}/>
                    <Route path="/home" element={<Home setShow={setShow}/>}/>

                    <Route
                        path="/dashboard"
                        element={
                            <GuardRoute>
                            <Dashboard active="dashboard"/>
                            </GuardRoute>
                        }
                    />

                    <Route
                        path="/onboarding"
                        element={
                            <GuardRoute>
                            <Onboarding active="onboarding"/>
                            </GuardRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <GuardRoute>
                            <Profile active="profile"/>
                            </GuardRoute>
                        }
                    />
                </Routes>
                <SignIn
                    show={show}
                    setShow={setShow}
                />
                <Footer/>
            </Router>
        </div>
    );
}

export default App;
