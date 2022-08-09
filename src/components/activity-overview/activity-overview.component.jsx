import { useEffect, useState } from 'react';

import Activity from '../activity/activity.component';
import { fetchActivities } from '../../utils/firebase/firebase.utils';

const ActivityOverview = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities()
      .then((data) => setActivities(data))
      .catch('Error fetching activities');
  });

  return (
    <div>
      <h2>Activity Overview</h2>
      <p>Number of activities: {activities.length}</p>
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} />
      ))}
    </div>
  );
};

export default ActivityOverview;
