import './card.css';

const Card = ({image, title, profile, content,links}) => {
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
            <a href={'mailto:'+links.email} className="btn btn-link btn-just-icon"><i className="fas fa-envelope-open-text"></i></a>
                <a href={links.github} className="btn btn-link btn-just-icon"><i className="fab fa-github"></i></a>
                <a href={links.linkedin} className="btn btn-link btn-just-icon"><i className="fab fa-linkedin"></i></a>
            </div>
            </div>
        </div> 
    </div>
    );
}

export default Card;