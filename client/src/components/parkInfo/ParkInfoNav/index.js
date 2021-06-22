import './ParkInfoNav.css';

const ParkInfoNav = () => {
  return (
    <ul className="park-left-nav no-space-list">
      <li>
        <a>Description</a>
      </li>
      <li>
        <a>Entrance Fees</a>
      </li>
      <li>
        <a>Hours</a>
      </li>
      <li>
        <a>Actvities</a>
      </li>
      <li>
        <a>Contact Info</a>
      </li>
    </ul>
  );
};

export default ParkInfoNav;
