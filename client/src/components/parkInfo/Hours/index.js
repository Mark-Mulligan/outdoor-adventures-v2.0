import './Hours.css';
import { days, formatDate } from '../../../util/util';

/* Sometimes the date has a start and end date that are the same.  
This function returns only one date if they are the same or two if they are different. */

const formatStartAndEndDate = (startDate, endDate) => {
  if (startDate === endDate) {
    return formatDate(startDate);
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const Hours = ({ operatingHours }) => {
  console.log(operatingHours);

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
                            {formatStartAndEndDate(exception.startDate, exception.endDate)}
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
