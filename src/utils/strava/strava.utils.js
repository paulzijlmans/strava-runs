import { currentDate } from '../date/date.utils';
import { getToken, persistToken } from '../firebase/firebase.utils';

const { REACT_APP_STRAVA_CLIENT_ID, REACT_APP_STRAVA_CLIENT_SECRET } = process.env;

const BASE_ENDPOINT = 'https://www.strava.com/api/v3';


const refreshToken = async (currentRefreshToken) => {
  const queryString = `client_id=${REACT_APP_STRAVA_CLIENT_ID}
                      &client_secret=${REACT_APP_STRAVA_CLIENT_SECRET}
                      &refresh_token=${currentRefreshToken}
                      &grant_type=refresh_token`

  try {
    const response = await fetch(`${BASE_ENDPOINT}/oauth/token?${queryString}`, {
      method: 'POST'
    })
    const newToken = await response.json();

    if (newToken && newToken.access_token) {
      persistToken(newToken);
      return newToken;
    }
    throw new Error('Error fetching new token from Strava.');
  } catch (error) {
    console.log('Error fetching new token from Strava.');
  }
}


export const fetchActivities = async () => {
  try {
    let token = await getToken();
    if (currentDate > token.expires_at) {
      token = await refreshToken(token.refresh_token);
    }

    const reponse = await fetch(`${BASE_ENDPOINT}/athlete/activities?per_page=10`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    });
    return await reponse.json();
  } catch (error) {
    console.log('Error fetching activities.');
  }
};