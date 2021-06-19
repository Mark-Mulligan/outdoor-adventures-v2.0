const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

const Hours = ({ operatingHours }) => {
  return (
    <div>
      <h3>Operating Hours</h3>

      <div className="container">
        <div className="row">
          <div className="col">
            <p>Standard Hours</p>
            <ol>
              {days.map((day) => {
                return (
                  <li key={day}>
                    {day} {operatingHours[0].standardHours[day]}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="col">
            <p>Holiday Hours</p>
            <ul>
              {operatingHours[0].exceptions.map((exception) => {
                return (
                  <li key={exception.name}>
                    {exception.name} ({exception.startDate}) {exception.exceptionHours.monday}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hours;
