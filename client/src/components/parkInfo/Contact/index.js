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
    </div>
  );
};

export default Contact;
