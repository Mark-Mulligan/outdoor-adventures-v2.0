import './CustomNav.css';
import { Link } from 'react-router-dom';

const CustomNav = () => {
  return (
    <div className="nav-container">
      <Link to="/parks" className="back-link">
        <i class="fas fa-2x fa-arrow-left"></i>
      </Link>
    </div>
  );
};

export default CustomNav;
