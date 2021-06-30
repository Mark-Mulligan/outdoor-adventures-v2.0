import { Link } from 'react-router-dom';
import './ParkInfoNav.css';

const ParkInfoNav = () => {
  return (
    <div className="park-left-nav-wrapper">
      <div className="park-left-nav">
        <div>
          <Link to="/parks" className="back-link">
            <i class="fas fa-2x fa-arrow-left"></i>
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
    </div>
  );
};

export default ParkInfoNav;
