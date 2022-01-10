import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';
import Card from '../../common/Team/Card';
const TeamSection = () => {

    return (

        <div className="section text-center" id='team-section'>
                <h2 className="title">our team</h2>
                <div className="team">
                <div className="row">
                    <Card 
                        image={image1}
                        title="Karandeep Singh"
                        profile="Software Enginner"
                        content="You can write here details about one of your team members. You can give more details about what they do. Feel free to add some
                        for people to be able to follow them outside the site."
                    />

                    <Card 
                        image={image2}
                        title="Harish Patidar"
                        profile="Software Enginner"
                        content="You can write here details about one of your team members. You can give more details about what they do. Feel free to add some
                        for people to be able to follow them outside the site."
                    />

                    <Card 
                        image={image3}
                        title="Kashifa Khan"
                        profile="Software Enginner"
                        content="You can write here details about one of your team members. You can give more details about what they do. Feel free to add some
                        for people to be able to follow them outside the site."
                    />
                
                </div>
                </div>
            </div>
    );
}
export default TeamSection;