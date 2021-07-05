import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ParkInfoNav.css';

const ParkInfoNav = ({ menuOpen, handleMenuClick }) => {
  const [windowWidth, setWindowWidth] = useState(null);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return window.removeEventListener('resize', handleWindowResize);
  }, []);

  return (
    <>
      {windowWidth < 900 ? (
        <div className={`park-left-nav ${menuOpen ? 'menu-open' : 'menu-closed'}`}>
          <div className="park-left-nav-top">
            <Link className="back-link" to="/parks">
              <i className="fas fa-2x fa-arrow-left"></i> Back to parks
            </Link>
          </div>

          <ul className="no-space-list">
            <li>
              <a onClick={handleMenuClick} href="#description">
                Description
              </a>
            </li>
            <li>
              <a href="#entrance-fees">Entrance Fees</a>
            </li>
            <li>
              <a href="#hours">Hours</a>
            </li>
            <li>
              <a href="#activites">Actvities</a>
            </li>
            <li>
              <a href="#contact">Contact Info</a>
            </li>
            <li>
              <a href="#photos">Photos</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="park-left-nav">
          <div className="park-left-nav-top">
            <Link className="back-link" to="/parks">
              <i className="fas fa-2x fa-arrow-left"></i> Back to parks
            </Link>
          </div>

          <ul className="no-space-list">
            <li>
              <a href="#description">Description</a>
            </li>
            <li>
              <a href="#entrance-fees">Entrance Fees</a>
            </li>
            <li>
              <a href="#hours">Hours</a>
            </li>
            <li>
              <a href="#activites">Actvities</a>
            </li>
            <li>
              <a href="#contact">Contact Info</a>
            </li>
            <li>
              <a href="#photos">Photos</a>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ParkInfoNav;
