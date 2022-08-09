const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
const BASE_ENDPOINT = 'https://maps.googleapis.com/maps/api/staticmap';

export const getMap = async (summaryPolyline) => {
  // return fetch(`${BASE_ENDPOINT}?size=600x300&maptype=roadmap&path=enc:${summaryPolyline}&key=${REACT_APP_GOOGLE_MAPS_API_KEY}`);
  return '';
}