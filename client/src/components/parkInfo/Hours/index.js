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
    <div id="hours" className="container info-section">
      <h2>Operating Hours</h2>
      <hr />

      <div>
        {operatingHours.map((setOfHours) => {
          return (
            <div key={setOfHours.description} className="row">
              <h5 className="fst-italic mb-3">{setOfHours.description}</h5>
              <div className="col">
                <h6 className="fw-bold">Standard Hours</h6>
                <ol className="no-space-list">
                  {days.map((day) => {
                    return (
                      <li key={day.value}>
                        <span className="day-span fw-light">{day.value}</span>
                        <span className="fw-light">{operatingHours[0].standardHours[day.accessor]}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
              {setOfHours.exceptions.length > 0 && (
                <div className="col">
                  <h6 className="fw-bold">Holiday Hours</h6>
                  <ul className="no-space-list">
                    {setOfHours.exceptions.map((exception) => {
                      return (
                        <li key={exception.startDate}>
                          <div className="fst-italic">{exception.name}</div>
                          <div className="fw-light">
                            {exception.startDate} - {exception.endDate}
                          </div>
                          <div className="fw-light">{exception.exceptionHours.monday}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hours;
