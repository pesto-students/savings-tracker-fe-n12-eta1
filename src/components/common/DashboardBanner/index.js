
import './index.css';

const DashboardBanner = ({image}) => {

    return (
        <>
        <section className="top_banner flex align-items-center justify-content-center" 
            style={{ backgroundImage: `url("${image}")` }}>
        </section>

        </>
    );
};

export default DashboardBanner