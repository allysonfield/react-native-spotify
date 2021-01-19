import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const search = async (key, limit) => {
  try {
    const token = await AsyncStorage.getItem('spotify@tokendev');
    const {data} = await axios.get(
      `https://api.spotify.com/v1/search?query=${key}&offset=0&limit=${limit}&type=playlist`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export {search};
