import './ParkInfoNav.css';

const ParkInfoNav = () => {
  return (
    <ul className="park-left-nav no-space-list">
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
    </ul>
  );
};

export default ParkInfoNav;
