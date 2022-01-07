
  import banner from './images/banner.jpg';
  import Button from '../common/Button/index.js';

  const Banner = ({show, setShow}) => {

    return (
      <>
      <div className="w-100 min-vh-75 relative page-header" style={{backgroundImage: "url(" + banner + ")"}}>
        <span className="mask bg-gradient-primary opacity-4"></span>
        <div className="container text-center z-index-999 text-white">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-white"> Savings Tracker</h1>
                    <p className="lead">looking to digitally track your financial goals and expenses with minimal efforts?
                    <br/>We are there to help you
                    </p>
                    <Button text="Get Started" extraClass="primary btn-round text-white" onClick={() => setShow(true)}/>
                </div>
            </div>
            
        </div>
        </div>
  
      </>
  
    )
  
  }
  
  export default Banner;
  