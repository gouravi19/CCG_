import { Link } from 'react-router-dom';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">CGG</div>
        
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/contact-details">Submissions</Link>
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
        
        <div className="footer-social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
        </div>
        
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} MERN Stack App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;