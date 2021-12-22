import axios from 'axios';
import { ACCESS_TOKEN, HOST, PORT } from './constants';

export const isTokenValid = async (): Promise<boolean> => {
  const token = localStorage.getItem(ACCESS_TOKEN);

  if (!token) {
    return false;
  }

  const headers = {
    'Authorization': `Bearer ${token}`
  }

  let checkValdity;
  
  try {
    checkValdity = await axios.post(`${HOST}:${PORT}/user/verify`, null, { headers });
  } catch (e) {
    localStorage.removeItem(ACCESS_TOKEN);
    return false;
  }

  return !!checkValdity.data.message;
}

export default isTokenValid;
