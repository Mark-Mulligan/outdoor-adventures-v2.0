const Actvities = ({ activities }) => {
  const sortObjByName = (a, b) => {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  };

  const returnSingleCol = () => {
    return (
      <ul className="no-space-list">
        {activities.sort(sortObjByName).map((activity) => {
          return <li key={activity.id}>{activity.name}</li>;
        })}
      </ul>
    );
  };

  const returnTwoCol = () => {
    let listFirstHalf = [];
    let listSecondHalf = [];

    activities.sort(sortObjByName).forEach((activity, index) => {
      if (index < activities.length / 2) {
        listFirstHalf.push(activity);
      } else {
        listSecondHalf.push(activity);
      }
    });

    return (
      <ul className="no-space-list row">
        <div className="col">
          {listFirstHalf.map((activity) => {
            return <li key={activity.id}>{activity.name}</li>;
          })}
        </div>
        <div className="col">
          {listSecondHalf.map((activity) => {
            return <li key={activity.id}>{activity.name}</li>;
          })}
        </div>
      </ul>
    );
  };

  return (
    <div id="activites" className="container info-section">
      <h2>Activites</h2>
      <hr />
      {activities.length <= 10 ? returnSingleCol() : returnTwoCol()}
    </div>
  );
};

export default Actvities;
