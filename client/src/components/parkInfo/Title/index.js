import './Title.css';

const Title = ({ parkName }) => {
  return (
    <div className="container parkname-container">
      <h1 className="text-center">{parkName}</h1>
    </div>
  );
};

export default Title;
