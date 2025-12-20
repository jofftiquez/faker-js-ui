import axios from 'axios';
import { useRuntimeConfig } from '#imports';

export default () => {
  const config = useRuntimeConfig();
  const apiURL = config.public.ipStackAPIURL;
  const apiKey = config.public.ipStackAPIKey;

  async function getCountry () {
    const fields = [
      'country_code',
      'country_name',
      'latitude',
      'longitude',
      'location.country_flag',
      'location.calling_code',
    ];
    const { data } = await axios({
      method: 'get',
      url: `${apiURL}/check?access_key=${apiKey}&fields=${fields.join(',')}`,
    });
    return data;
  }

  return {
    getCountry,
  };
};
