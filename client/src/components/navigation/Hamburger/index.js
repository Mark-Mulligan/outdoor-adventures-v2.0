import './Hamburger.css';

const Hamburger = ({ handleHamburgerClick, menuOpen }) => {
  return (
    <div className="hamburger" onClick={handleHamburgerClick}>
      <div className={menuOpen ? 'top-line-open' : 'top-line-closed'}></div>
      <div className={menuOpen ? 'middle-line-open' : 'middle-line-closed'}></div>
      <div className={menuOpen ? 'bottom-line-open' : 'bottom-line-closed'}></div>
    </div>
  );
};

export default Hamburger;
