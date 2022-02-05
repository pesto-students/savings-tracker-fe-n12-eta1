/*import image1 from './images/1.jpg';
import image2 from './images/2.jpg';
import image3 from './images/3.jpg';*/
import image1 from './images/karandeep.jpg';
import image2 from './images/harish_patidar.jpg';
import image3 from './images/kashifa-profile.jpeg';
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
                        profile="Web Developer"
                        content="A Freelance Web developer with experience in frontend and backend"
                        links={{
                            github: 'https://github.com/karan-2809',
                            linkedin: 'https://www.linkedin.com/in/karandeep-singh-a904b3a2/',
                            email: 'karannnnn@yahoo.com'
                        }}
                    />

                    <Card
                        image={image2}
                        title="Harish Patidar"
                        profile="Software Enginner"
                        content="You can rely on our amazing features list and our customer services will be great experience."
                        links={{
                            github: 'https://github.com/rjharish333',
                            linkedin: 'https://www.linkedin.com/in/er-harish-patidar/',
                            email: 'patidarharish08@gmail.com'
                        }}
                    />

                    <Card
                        image={image3}
                        title="Kashifa Khan"
                        profile="Software Enginner"
                        content="You can rely on our amazing features list and our customer services will be great experience."
                        links={{
                            github: 'https://github.com/kashifakhan1996',
                            linkedin: 'https://www.linkedin.com/in/kashifa-khan-520102127/',
                            email: 'khankashifa.1996@gmail.com'
                        }}
                    />

                </div>
            </div>
        </div>
    );
}
export default TeamSection;