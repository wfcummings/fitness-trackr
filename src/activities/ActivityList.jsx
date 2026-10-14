import { useState } from "react";
import { deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();
  const [error, setError] = useState();

  const tryDelete = async (id) => {
    setError(null);
    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      {error && <p role="alert">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            {token && (
              <button onClick={() => tryDelete(activity.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
