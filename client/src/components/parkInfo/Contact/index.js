import { formatPhoneNum } from '../../../util/util';

const Contact = ({ contactInfo }) => {
  return (
    <div id="contact" className="container info-section">
      <h2>Contact Info</h2>
      <hr />
      <div className="row">
        <div className="col">
          {contactInfo.phoneNumbers
            .filter((number) => number.type === 'Voice')
            .map((result) => {
              return <p key={result.phoneNumber}>Phone: {formatPhoneNum(result.phoneNumber)}</p>;
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
