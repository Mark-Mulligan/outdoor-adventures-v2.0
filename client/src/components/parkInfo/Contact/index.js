const Contact = ({ contactInfo }) => {
  return (
    <div className="container">
      <h3>Contact Info</h3>
      <div className="row">
        <div className="col">
          {contactInfo.phoneNumbers
            .filter((number) => number.type === 'Voice')
            .map((result) => {
              return <p key={result.phoneNumber}>Phone: {result.phoneNumber}</p>;
            })}
        </div>
        <div className="col">
          {contactInfo.emailAddresses.map((email) => (
            <p key={email.emailAddress}> Email: {email.emailAddress}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
