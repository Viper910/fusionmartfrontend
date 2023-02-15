import './Footer.css'
export default function Footer(){
  return (
    <div className='footer'>
    <div className="card footer-card" id='About'>
      <div className="card-body">
        <h5 className="card-title">FusionMart Project</h5>
        <p className="card-text">
          Simple E-commerce website project.Plese give me feedback for this website.
        </p>
        <button className="btn btn-primary">
          Give Feedback
        </button>
      </div>
    </div>
    <div className='container-fluid footer-container' id='contactus'>
        <h5 className='footer-heading'>Follow Me</h5>
        <ul className='footer-ul'>
            <li  className='footer-li'><i className="fa fa-facebook" aria-hidden="true"></i></li>
            <li  className='footer-li'><i className="fa fa-twitter" aria-hidden="true"></i></li>
            <li  className='footer-li'><i className="fa fa-instagram" aria-hidden="true"></i></li>
        </ul>
    </div>
    </div>
  );
}
