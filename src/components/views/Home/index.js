import {useEffect} from 'react';
import Banner from '../../Banner/index';
import MainSection from './MainSection';
import ContactSection from './ContactSection';
import './index.css';
import TeamSection from './TeamSection';
import {useLocation} from "react-router-dom";


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const hashSections = ['#contact-section', '#team-section'];

function _(id) {
    return document.getElementById(id);
}

function toggleClass(el, operation) {

    const activeElements = [..._('sectionsNav').querySelectorAll('.active')];

    activeElements.map(activeEl => activeEl.classList.remove('active'));

    el.classList[operation]('active');
}

const Home = ({show, setShow}) => {

    const hash = useLocation().hash;

    useEffect(() => {

        if (hashSections.includes(hash)) {
            setTimeout(() => {
                const id = hash.substring(1);
                const element = _(id);
                element.scrollIntoView({
                                           behavior: 'smooth'
                                       });

                if (id === 'contact-section') {
                    _('contact-us-item').classList.add('active');
                }
            }, 10)
        }

        const watchScroll = (e) => {

            const contactSection = _('contact-section');

            if (!contactSection) return;

            if (isElementInViewport(contactSection)) {
                _('contact-us-item').classList.add('active');
            }
            else {
                _('contact-us-item').classList.remove('active');

            }
        };

        document.addEventListener('scroll', watchScroll);

        return () => {
            document.removeEventListener('scroll', watchScroll);
            _('contact-us-item').classList.remove('active');

        }
    }, []);


    return (
        <>
            <Banner
                show={show}
                setShow={setShow}
            />

            <div className="main main-raised">
                <div className="container">
                    <MainSection/>

                    <TeamSection/>

                    <ContactSection/>

                </div>
            </div>

        </>
    );
};

export default Home