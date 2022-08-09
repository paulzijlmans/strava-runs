const formatDistance = (distanceInMeters) => {
  const distanceInKm = distanceInMeters / 1000;
  return distanceInKm.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const formatPace = (averageSpeedInMetersPerSecond) => {
  const seconds = (1 / averageSpeedInMetersPerSecond) * 1000;
  return Math.floor(seconds / 60) + ':' + Math.floor(seconds % 60);
};

const formatHeartrate = (heartRate) => {
  return heartRate.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

const Activity = ({ activity }) => {
  const { name, distance, average_speed, average_heartrate } = activity;

  return (
    <div>
      <h2>{name}</h2>
      <div>Afstand: {formatDistance(distance)} km</div>
      <div>Gemiddeld tempo: {formatPace(average_speed)} /km</div>
      <div>Gemiddelde hartslag: {formatHeartrate(average_heartrate)} bpm</div>
    </div>
  );
};

export default Activity;
