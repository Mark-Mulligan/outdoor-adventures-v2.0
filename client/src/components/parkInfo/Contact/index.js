const Contact = ({ contactInfo }) => {
  return (
    <div>
      <h3>Contact Info</h3>
      <div>
        <p>Email</p>
        {contactInfo.emailAddresses.map((email) => (
          <p key={email.emailAddress}>{email.emailAddress}</p>
        ))}
      </div>
      <div>
        <p>Phone</p>
        {contactInfo.phoneNumbers
          .filter((number) => number.type === 'Voice')
          .map((result) => {
            return <p key={result.phoneNumber}>{result.phoneNumber}</p>;
          })}
      </div>
    </div>
  );
};

export default Contact;
