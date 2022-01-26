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
import {useDispatch, useSelector} from 'react-redux';
import SignIn from "./components/views/Signin";
import List from './components/views/Goals/List';
import {auth} from './firebase';
import Subscription from "./components/views/Subscription";

function App() {

    const dispatch = useDispatch();

    const APP_LOADING = useSelector((state) => state.appLoader);

    const [loading, setLoading] = useState(true);

    const [showSignIn, setShowSignIn] = useState(false);

    useEffect(() => {


        auth.onAuthStateChanged(function (user) {
            dispatch({type: 'AUTH', payload: user});

            /* if (user) {
                 user.getIdToken().then(token => {
                     console.log(token);
                 });
             }*/

            dispatch({type: 'LOADING', payload: false});

            setLoading(false);

        });


    }, []);


    return (
        <div className="App">

            {APP_LOADING ? <Spinner/> :
                <Router>
                    <Header setShow={setShowSignIn}
                    />
                    <Routes>
                        <Route path="/" element={<Home setShow={setShowSignIn}/>}/>
                        <Route path="/home" element={<Home setShow={setShowSignIn}/>}/>

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
                            path="/subscription"
                            element={
                                <GuardRoute>
                                    <Subscription active="subscription"/>
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
                        show={showSignIn}
                        setShow={setShowSignIn}
                    />
                    <Footer/>
                </Router>
            }
        </div>
    );
}

export default App;
