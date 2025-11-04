export const WEATHER_API = {
  baseURL: 'https://api.openweathermap.org/data/2.5',
  apiKey: '57036209041bfaf8c8d1e00907885540',
};

export const FAKE_STORE_API = {
  baseURL: 'https://fakestoreapi.com',
};

export const ENDPOINTS = {
  weather: {
    current: '/weather',
    forecast: '/forecast',
  },
  fakeStore: {
    products: '/products',
    users: '/users',
  },
};

export const getWeatherURL = (lat, lon) => 
  `${WEATHER_API.baseURL}${ENDPOINTS.weather.current}?lat=${lat}&lon=${lon}&appid=${WEATHER_API.apiKey}&units=metric`;

export const getHotelsURL = () => 
  `${FAKE_STORE_API.baseURL}${ENDPOINTS.fakeStore.products}`;

export const getUsersURL = () => 
  `${FAKE_STORE_API.baseURL}${ENDPOINTS.fakeStore.users}`;
