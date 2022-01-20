import './App.css';
import Header from './components/Header/index';
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import Home from './components/views/Home/index.js';
import Footer from './components/Footer';
import Onboarding from "./components/views/Onboarding";
import Dashboard from "./components/views/Dashboard";
import Portfolio from './components/views/Portfolio';
import Profile from "./components/views/Profile";
import GuardRoute from './GuardRoute';
import {useEffect, useState} from 'react';
import Spinner from './components/common/Spinner';
import {useDispatch} from 'react-redux';
import Banner from './components/Banner/images/banner.jpg'
import SignIn from "./components/views/Signin";
import List from './components/views/Goals/List';
import {auth} from './firebase';
import axiosClient from "./axios";

function App() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);

    useEffect(() => {


        auth.onAuthStateChanged(function (user) {
            dispatch({type: 'AUTH', payload: user});

            if (user) {
                user.getIdToken().then(token => {
                    console.log(token);
                });
            }
            setLoading(false);

        });

        // setLoading(false);


    }, []);


    return (
        <div className="App">

            {loading ? <Spinner/> : ''}
            {!loading &&
            <Router>
                <Header setShow={setShow}
                />
                <Routes>
                    <Route path="/" element={<Home setShow={setShow}/>}/>
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
                        path="/goals"
                        element={
                            <GuardRoute>
                                <List active="goals"/>
                            </GuardRoute>
                        }
                    />

                    <Route
                        path="/portfolio"
                        element={
                            <GuardRoute>
                                <Portfolio active="portfolio"/>
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
            }
        </div>
    );
}

export default App;
