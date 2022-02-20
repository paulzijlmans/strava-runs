import './App.css';

function App() {

  const AUTH_ENDPOINT = "https://www.strava.com/oauth/authorize";

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const redirectUri = "http://localhost:3000";
  const authUrl = `${AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=activity:read_all`;

  return (
    <div>
      if()
      <a href={authUrl}>Connect With Strava</a>
    </div>
  );
}

export default App;
