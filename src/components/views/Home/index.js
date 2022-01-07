import { useState } from 'react';
import Banner from '../../Banner/index';
import MainSection from './MainSection';
import ContactSection from './ContactSection';
import './index.css';
import TeamSection from './TeamSection';
import SignIn from '../Signin/index';

const Home = () => {

    const [show, setShow] = useState(false);

    return (
       <>
        <Banner 
            show={show}
            setShow={setShow}
         />

        <SignIn
            show={show}
            setShow={setShow}
        />
        
        <div className="main main-raised">
            <div className="container">
                <MainSection />

                <TeamSection />

                <ContactSection />
            
            </div>
        </div>

        </>
    );
}

export default Home