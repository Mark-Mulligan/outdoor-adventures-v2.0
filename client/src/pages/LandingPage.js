import { useEffect } from 'react';

const LandingPage = ({ apiUp }) => {
  useEffect(() => {
    console.log(apiUp);
  });

  const renderPage = () => {
    if (apiUp) {
      return (
        <div>
          <h1>Landing Page</h1>
        </div>
      );
    } else if (apiUp === null) {
      return <div>Loading...</div>;
    } else {
      return <div>Api failed to load</div>;
    }
  };

  return <div>{renderPage()}</div>;
};

export default LandingPage;
