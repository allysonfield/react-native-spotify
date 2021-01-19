import axios from 'axios';
const toptracks = async (id, token) => {
  const {data} = await axios
    .get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ES`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .catch(err => {
      throw err;
    });
  return data.tracks;
};

export {toptracks};
