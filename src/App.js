import React from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function App() {

  const STRAVA_AUTH_ENDPOINT = "https://www.strava.com/oauth/authorize";
  const STRAVA_TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";

  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000";
  const authUrl = `${STRAVA_AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=activity:read_all`;
  const code = new URLSearchParams(useLocation().search).get('code');
  const stravaApiUrl = `${STRAVA_TOKEN_ENDPOINT}?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`;

  return code
    ? (
      <div>
        <p>Code: {code}</p>
        <h2>Strava</h2>
        <p>{stravaApiUrl}</p>
      </div>
    )
    : (
      <div>
        <a href={authUrl}>Connect With Strava</a>
      </div>
    );
}

export default App;
