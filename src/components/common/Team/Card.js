import './card.css';

const Card = ({image, title, profile, content}) => {
    return (
    <div className="col-md-4">
        <div className="team-player">
            <div className="card card-plain">
            <div className="col-md-6 ml-auto mr-auto">
                <img src={image} alt="Team Member" className="img-raised rounded-circle img-fluid"/>
            </div>
            <h4 className="card-title">{title}
                <br/>
                <small className="card-description text-muted">{profile}</small>
            </h4>
            <div className="card-body">
                <p className="card-description">{content}</p>
            </div>
            <div className="card-footer justify-content-center">
                <a href="#twitter" className="btn btn-link btn-just-icon"><i className="fab fa-twitter"></i></a>
                <a href="#instagram" className="btn btn-link btn-just-icon"><i className="fab fa-instagram"></i></a>
                <a href="#facebook" className="btn btn-link btn-just-icon"><i className="fab fa-facebook-square"></i></a>
                <a href="#linkdin" className="btn btn-link btn-just-icon"><i className="fab fa-linkedin"></i></a>
            </div>
            </div>
        </div> 
    </div>
    );
}

export default Card;