import './Hours.css';

const days = [
  { accessor: 'monday', value: 'Mon' },
  { accessor: 'tuesday', value: 'Tue' },
  { accessor: 'wednesday', value: 'Wed' },
  { accessor: 'thursday', value: 'Thu' },
  { accessor: 'friday', value: 'Fri' },
  { accessor: 'saturday', value: 'Sat' },
  { accessor: 'sunday', value: 'Sun' },
];

const Hours = ({ operatingHours }) => {
  return (
    <div className="container">
      <h3>Operating Hours</h3>

      <div>
        {operatingHours.map((setOfHours) => {
          return (
            <div key={setOfHours.description} className="row">
              <p>{setOfHours.description}</p>
              <div className="col">
                <p>Standard Hours</p>
                <ol className="no-space-list">
                  {days.map((day) => {
                    return (
                      <li key={day.value}>
                        <span className="day-span">{day.value}</span>
                        <span>{operatingHours[0].standardHours[day.accessor]}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="col">
                <p>Holiday Hours</p>
                <ul className="no-space-list">
                  {setOfHours.exceptions.map((exception) => {
                    return (
                      <li key={exception.startDate}>
                        <div>{exception.name}</div>
                        <div>
                          {exception.startDate} - {exception.endDate}
                        </div>
                        <div>{exception.exceptionHours.monday}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hours;
