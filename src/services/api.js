import axios from 'axios';
import {encode} from 'base-64';
import {ClientId, ClientSecret} from './Credentials';

const access = async () => {
  try {
    const {data} = await axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encode(`${ClientId}:${ClientSecret}`)}`,
      },
      data: 'grant_type=client_credentials',
      method: 'POST',
    });
    return data.access_token;
  } catch (error) {
    console.log('error access', error.response);
    throw error;
  }
};

export {access};
