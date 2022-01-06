
import Banner from '../../Banner/index';
import MainSection from './MainSection';
import ContactSection from './ContactSection';
import './index.css';
import TeamSection from './TeamSection';

const Home = () => {

    return (
       <>
        <Banner />
        
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